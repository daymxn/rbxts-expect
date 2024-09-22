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

import type {
  expect,
  extendMethods,
  extendNOPs,
  extendNegations,
} from "@src/expect";
import type { Placeholder } from "@src/message";
import type { Proxy } from "@src/util/proxy";

/**
 * Parent interface for all {@link expect} calls.
 *
 * @remarks
 * When a call to {@link expect} is made, the returned value
 * is an instance of _this_ interface.
 *
 * It provides a common means for all the methods to be attached.
 *
 * You can think of it as an instance of {@link expect}, or a controller
 * of sorts.
 *
 * Although, {@link expect} is designed with the idea of call-when-you-need in mind.
 * That is, it's not expected that you'd save the result of am {@link expect} call,
 * and then re-call it at some point down the line.
 *
 * For example:
 * ```ts
 * // DONT do this
 * const assertion = expect(5);
 * assertion.to.be.number();
 * assertion.to.equal(5);
 *
 * // Do this
 * expect(5).to.be.a.number().that.equals(5);
 *
 * // Or this
 * const actual = 5;
 * expect(actual).to.be.a.number();
 * expect(actual).to.equal(5);
 * ```
 *
 * @see {@link extendMethods}, {@link extendNegations}, {@link extendNOPs}
 *
 * @public
 */
export interface Assertion<T = unknown> {
  /**
   * The "actual" value attached to this {@link expect} call.
   *
   * @remarks
   * Whatever argument was passed into {@link expect} is represented
   * as the "actual" value of the assertion, and stored here.
   *
   * In the case of a {@link Proxy}, the inner value of the proxy
   * is stored here instead.
   *
   * @example
   * ```ts
   * expect(5).to.not.equal(4); // value === 5
   * ```
   *
   * @public
   */
  readonly value: T;

  /**
   * @internal
   * @private
   */
  _self: this;

  /**
   * @internal
   * @private
   */
  _negated: boolean;

  /**
   * @internal
   * @private
   */
  _proxy?: Proxy<T>;
}

/**
 * Helper type for inferring the type of an array.
 *
 * @example
 * ```ts
 * function include<T>(source: T, expectedValue: InferArrayElement<T>) {
 *   return source.includes(expectedValue);
 * }
 * ```
 *
 * @public
 */
export type InferArrayElement<T> = T extends (infer U)[] ? U : never;

/**
 * Callback for deciding if a `value` matches a given type `T`.
 *
 * @remarks
 * Returning a boolean of `true` means that the `value` passes the check,
 * and is of type `T`. Alternatively, not returning anything (`void`) will
 * also count as a pass.
 *
 * On the other hand, a boolean of `false` means that the `value` did NOT pass
 * the check, and an error will be thrown.
 *
 * You can also return a string, in which case it will also be treated as a failure-
 * but the string you provide will be propogated as a {@link Placeholder.reason | reason}
 * in the failure.
 *
 * @example
 * ```ts
 * const isNumber: TypeCheckCallback = (value) => {
 *   return typeOf(value) === "number";
 * }
 * ```
 *
 * @public
 */
export type TypeCheckCallback<T = defined> = (
  value: T
) => boolean | string | void;

/**
 * A user-defined enum, as it would be defined in the transpiled Lua.
 *
 * @remarks
 * Used for type safe identification of enum tables.
 *
 * @example
 * ```ts
 * enum Sport {
 *   Basketball,
 *   Football,
 *   Soccer
 * };
 *
 * function PrintEnumValue(enum: LuaEnum, value: keyof LuaEnum) {
 *   print(enum[value]);
 * }
 *
 * PrintEnumValue(Sport, "Soccer");
 * ```
 *
 * @public
 */
export type LuaEnum = Record<string | number, string>;
