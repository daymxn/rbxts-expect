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

export type PropertyAccess = string[];
export type MethodCalled = [string, unknown[]];

export function computeFullProxyPath<T>(proxy: Proxy<T>) {
  let path = proxy._proxy_path;
  let current = proxy._proxy_parent;

  while (current) {
    if (current._proxy_path !== undefined) {
      path = `${current._proxy_path}.${path}`;
    }

    current = current._proxy_parent;
  }

  return path;
}

export function isProxy<T>(value: T): value is Proxy<T> {
  try {
    return rawget(value, "_is_proxy") === true;
  } catch (e) {
    return false;
  }
}

export interface ProxyInstance<T> {
  _is_proxy: true;
  _proxy_value: T;
  _proxy_parent?: Proxy<unknown>;
  _proxy_path?: string;
}

const proxyProperties = [
  "_is_proxy",
  "_proxy_value",
  "_proxy_parent",
  "_proxy_path",
];

export type Proxy<T> = T & ProxyInstance<T>;

// TODO(): propogate any errors out, so this isn't included in the stack
function OnIndex<T>(Self: Proxy<T>, index: unknown) {
  // log access
  // return a proxy version of the object if it's a table
  // should we make a new proxy on every access though, or should we only do it on the first access?
  if (proxyProperties.includes(tostring(index))) {
    return rawget(Self, index);
  }

  return proxy(rawget(Self._proxy_value, index), Self, tostring(index));
}

// TODO(): add functionality in expect() to check if value is a proxy
export function proxy<T>(
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

export function withProxy<T, R = unknown>(
  value: T,
  callback: (proxy: Proxy<T>) => R
): R {
  return callback(proxy(value));
}
