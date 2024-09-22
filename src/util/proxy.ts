/**
 * @license
 * Copyright 2024 Daymon Littrell-Reyes
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// TODO(): move to an external lib at rbxts/proxy
// also could make a mock lib with similiar functionality

import type { Assertion, expect } from "@src/expect";
import type { Placeholder } from "@src/message";

export type PropertyAccess = string[];
export type MethodCalled = [string, unknown[]];

/**
 * Recursively resolves the {@link ProxyInstance._proxy_path | path} and
 * {@link ProxyInstance._proxy_parent | parent} of a {@link Proxy} to
 * create a full path from the root.
 *
 * @remarks
 * Can be used to get the full path of leaf nodes.
 *
 * @example
 * ```ts
 * print(computeFullProxyPath(myProxy.parent.parent.cars));
 * ```
 *
 * Output:
 * ```text
 * parent.parent.cars
 * ```
 *
 * @public
 */
export function computeFullProxyPath<T>(proxy: Proxy<T>) {
  let path = getProxyPath(proxy);
  let current = getProxyParent(proxy);

  while (current) {
    if (getProxyPath(current) !== undefined) {
      path = `${getProxyPath(current)}.${path}`;
    }

    current = getProxyParent(current);
  }

  return path;
}

/**
 * Type guard for {@link Proxy} values.
 *
 * @param value - The value to check is a proxy
 *
 * @example
 * ```ts
 * function LogValue(value: unknown) {
 *  if(isProxy(value)) {
 *    print(getProxyValue(value));
 *  } else {
 *    print(value);
 *  }
 * }
 *
 * LogValue(5);
 * LogValue(createProxy({name: "Daymon"}));
 * ```
 *
 * Output:
 * ```text
 * 5
 * { name: "Daymon" }
 * ```
 *
 * @public
 */
export function isProxy<T>(value: T): value is Proxy<T> {
  try {
    return rawget(value, "_is_proxy") === true;
  } catch (e) {
    return false;
  }
}

/**
 * The data attached to a {@link Proxy}.
 *
 * @remarks
 * You'll rarely (if ever) need to use this interface,
 * and should instead use {@link Proxy} instead.
 *
 * This is mainly provided as a way to clarify
 * how a proxy looks internally.
 *
 * @see {@link createProxy}, {@link withProxy}
 *
 * @public
 */
export interface ProxyInstance<T> {
  /**
   * A value attached to all proxies to easily identify them as proxies.
   *
   * @remarks
   * If you're wanting to check if something is a proxy, you should
   * typically use {@link isProxy} instead.
   *
   * @example
   * ```ts
   * if(rawget(value, "_is_proxy") === true) {
   *  return getProxyValue(value);
   * }
   * ```
   *
   * @see {@link isProxy}
   */
  _is_proxy: true;

  /**
   * The inner value that this proxy is wrapping around.
   *
   * @remarks
   * You should use {@link getProxyValue} when you want to
   * access this value.
   *
   * Note that {@link Assertion.value} is already mapped to this
   * whenever dealing with proxies.
   *
   * @example
   * ```ts
   * const proxy = createProxy({name: "Daymon"});
   * print(getProxyValue(proxy));
   * ```
   *
   * Output:
   * ```text
   * { name: "Daymon" }
   * ```
   *
   * @see {@link getProxyValue}
   */
  _proxy_value: T;

  /**
   * The proxy that created this proxy.
   *
   * @remarks
   * You should use {@link getProxyParent} when you want to
   * access this value.
   *
   * All proxies recursively create proxies of their properties
   * whenever accessed.
   *
   * This allows the {@link ProxyInstance._proxy_path | proxy path} to
   * be computed in full, even if you only have the final proxy.
   *
   * _Note that if this is the root proxy, then it won't have a parent_.
   *
   * @example
   * ```ts
   * const proxy = createProxy({name: "Daymon"});
   * const child = proxy.name;
   *
   * assert(getProxyParent(child) === proxy);
   * ```
   *
   * @see {@link getProxyParent},
   * {@link ProxyInstance._proxy_path | proxy_path}
   */
  _proxy_parent?: Proxy<unknown>;

  /**
   * The index from where this proxy was created on the {@link ProxyInstance._proxy_parent | parent}.
   *
   * @remarks
   * You should use {@link getProxyPath} when you want to
   * access this value.
   *
   * All proxies recursively create proxies of their properties
   * whenever accessed.
   *
   * But each proxy has its own index that was used
   *
   * This allows the {@link ProxyInstance._proxy_path | proxy path} to
   * be computed in full, even if you only have the final proxy.
   *
   * _Note that if this is the root proxy, then it won't have a parent_.
   *
   * @example
   * ```ts
   * const proxy = createProxy({name: "Daymon"});
   * const child = proxy.name;
   *
   * print(getProxyPath(child));
   * print(getProxyPath(proxy));
   * ```
   *
   * Output:
   * ```text
   * name
   * nil
   * ```
   *
   * @see {@link getProxyPath}, {@link computeFullProxyPath}
   */
  _proxy_path?: string;
}

const proxyProperties = [
  "_is_proxy",
  "_proxy_value",
  "_proxy_parent",
  "_proxy_path",
];

/**
 * A wrapper around a value `T` that provides meta context
 * on index access.
 *
 * @remarks
 * Proxies attach a listener to the `__index` metatable, which allows
 * us to log the path of values accessed.
 *
 * This allows {@link expect} to populate the {@link Placeholder.path | path} automatically
 * for you when checks fail.
 *
 * You can create a proxy inline with {@link createProxy}, or use {@link withProxy} to
 * have one automatically created and provided for you; whichever style you prefer.
 *
 * Note that proxies are *ONLY* intended to be used on the _left_ side of checks
 * (ie; the {@link Placeholder.actual | actual} value). Using a proxy on the right
 * side (ie; the {@link Placeholder.expected | expected} value) is _undefined_ behavior,
 * and depending on the method may result in a warning to your console.
 *
 * @example
 * ```ts
 * withProxy(person, (proxy) => {
 *   expect(proxy.parent.cars).to.be.empty();
 * });
 * ```
 *
 * Error message:
 * ```text
 * Expected parent.cars to be empty, but it had 2 elements.
 * ```
 *
 * @see {@link createProxy}, {@link withProxy}
 *
 * @public
 */
export type Proxy<T> = T & ProxyInstance<T>;

function OnIndex<T>(Self: Proxy<T>, index: unknown) {
  if (proxyProperties.includes(tostring(index))) {
    throw `You can't acces '${index}' directly. Instead, either use 'rawget', or call one of the helper methods like 'getProxyValue'.`;
  }

  return createProxy(rawget(Self._proxy_value, index), Self, tostring(index));
}

/**
 * Safely gets the {@link ProxyInstance._proxy_value | value} of a proxy,
 * without trigger any metamethods.
 *
 * @param proxy - The proxy to get the value of.
 *
 * @returns The inner value of this proxy, type casted to `T`.
 *
 * @public
 */
export function getProxyValue<T = unknown>(proxy: Proxy<T>) {
  return rawget(proxy, "_proxy_value") as T;
}

/**
 * Safely gets the {@link ProxyInstance._proxy_path | path} of a proxy,
 * without trigger any metamethods.
 *
 * @param proxy - The proxy to get the path of.
 *
 * @returns The path of this proxy, or undefined if it was absent.
 *
 * @public
 */
export function getProxyPath<T = unknown>(proxy: Proxy<T>) {
  return rawget(proxy, "_proxy_path") as string | undefined;
}

/**
 * Safely gets the {@link ProxyInstance._proxy_parent | parent} of a proxy,
 * without trigger any metamethods.
 *
 * @param proxy - The proxy to get the parent of.
 *
 * @returns The parent of this proxy, or undefined if it doesn't have one.
 *
 * @public
 */
export function getProxyParent<T = unknown, R = unknown>(proxy: Proxy<T>) {
  return rawget(proxy, "_proxy_parent") as Proxy<R> | undefined;
}

/**
 * Creates a {@link Proxy} around a `value`.
 *
 * @remarks
 * You can also use the {@link withProxy} method to invoke
 * a callback with the result; depending on your style.
 *
 * @param value - The inner {@link ProxyInstance._proxy_value | value} of the proxy
 * @param parent - The proxy that created this proxy ({@link ProxyInstance._proxy_parent | parent}), or
 * undefined if it doesn't have a parent.
 * @param path - The index on the `parent` from which this proxy was created ({@link ProxyInstance._proxy_path | path}), or
 * undefined if it doesn't have a parent.
 *
 * @returns The newly created {@link Proxy}
 *
 * @example
 * ```ts
 * expect(createProxy(myObject)).parent.cars.to.be.empty();
 * ```
 *
 * Error message:
 * ```text
 * Expected parent.cars to be empty, but it had 2 elements.
 * ```
 *
 * @see {@link Proxy}, {@link withProxy}
 *
 * @public
 */
export function createProxy<T>(
  value: T,
  parent?: Proxy<unknown>,
  path?: string
): Proxy<T> {
  const baseProxy = {
    _is_proxy: true,
    _proxy_value: value,
    _proxy_parent: parent,
    _proxy_path: path,
  } as Proxy<T>;

  setmetatable(baseProxy, {
    __index: (t, index) => {
      return OnIndex(t, index);
    },
  });
  return baseProxy;
}

/**
 * Creates a {@link Proxy} around a `value`, and calls the `callback` with it.
 *
 * @param value - The value to wrap a {@link Proxy} around.
 * @param callback - A function to invoke with the created proxy.
 *
 * @returns Whatever the `callback` returns is propagated back out.
 *
 * @example
 * ```ts
 * withProxy(person, (proxy) => {
 *   expect(proxy.parent.cars).to.be.empty();
 * });
 * ```
 *
 * Error message:
 * ```text
 * Expected parent.cars to be empty, but it had 2 elements.
 * ```
 *
 * @see {@link Proxy}, {@link createProxy}
 *
 * @public
 */
export function withProxy<T, R = unknown>(
  value: T,
  callback: (proxy: Proxy<T>) => R
): R {
  return callback(createProxy(value));
}
