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

import { Result } from "@rbxts/rust-classes";
import type { expect, extendNegations, extendNOPs } from "@src/expect";
import { Assertion } from "@src/expect/types";
import { ExpectMessageBuilder } from "@src/message";

/**
 * The result of an {@link expect} method call.
 *
 * @remarks
 * A value of `Result.ok` means the check passed.
 *
 * A value of `Result.err` means the check failed.
 *
 * @see {@link ExpectMessageBuilder.pass | pass}, {@link ExpectMessageBuilder.fail | fail}
 *
 * @public
 */
export type ExpectMethodResult = Result<
  ExpectMessageBuilder,
  ExpectMessageBuilder
>;

/**
 * The implementation of a {@link expect} method.
 *
 * @remarks
 * Takes in a `source` that maps to the {@link Assertion} that
 * called this method (effectively the parent of the {@link expect} call).
 *
 * The `actual` value maps to the "actual" value that was provided when
 * {@link expect} was first called.
 *
 * And `...args` can be expanded to map however many arguments the
 * method expects. Usually, this contains the "expected" value(s).
 *
 * The method should return an {@link ExpectMethodResult} corresponding
 * to if the check represented by the method was a {@link ExpectMessageBuilder.pass | pass}
 * or a {@link ExpectMessageBuilder.fail | fail}.
 *
 * @see {@link extendMethods}, {@link CustomMethodImpls}
 *
 * @example
 * ```ts
 * const baseMessage = new ExpectMessageBuilder(
 *   `Expected ${place.name} to ${place.not} equal ${place.expected.value}`
 * )
 *
 * const equal: CustomMethodImpl<defined> = (
 *   _,
 *   actual: defined,
 *   expected: defined
 * ) => {
 *   const message = baseMessage.use().expectedValue(expected);
 *
 *   return actual === expected ? message.pass() : message.fail();
 * };
 * ```
 *
 * @public
 */
export type CustomMethodImpl<T = unknown> = (
  source: Assertion<T>,
  actual: T,
  ...args: never[]
) => ExpectMethodResult;

/**
 * An object of {@link expect} method names to {@link CustomMethodImpl | implementations}.
 *
 * @remarks
 * To be used with {@link extendMethods} to add additional methods to {@link expect}.
 *
 * Each key will map to the respective method. So you can add multiple methods at once,
 * or provide alternative namings for the same method.
 *
 * @example
 * ```ts
 * const equal: CustomMethodImpl<defined> = (...);
 *
 * extendMethods({
 *   equal: equal,
 *   equals: equal,
 *   eql: equal
 * });
 * ```
 *
 * @public
 */
export type CustomMethodImpls<T> = {
  [key: string]: CustomMethodImpl<T>;
};

let assertionMethods: CustomMethodImpls<unknown> = {};

/**
 * Adds additional methods to {@link expect}.
 *
 * @remarks
 * By passing in an object mapping of method names to {@link CustomMethodImpl | implementations},
 * you can add additional methods to {@link expect}.
 *
 * @param methods - An object of method names to {@link CustomMethodImpl | implementations}
 *
 * @example
 * ```ts
 * // create a message for the method
 * const baseMessage = new ExpectMessageBuilder(
 *   `Expected ${place.name} to ${place.not} equal ${place.expected.value}`
 * )
 *
 * // create an implementation for the method
 * const equal: CustomMethodImpl<defined> = (
 *   _,
 *   actual: defined,
 *   expected: defined
 * ) => {
 *   const message = baseMessage.use().expectedValue(expected);
 *
 *   return actual === expected ? message.pass() : message.fail();
 * };
 *
 * // augment the expect module so typescript knows the method exists
 * declare module "@rbxts/expect" {
 *   interface Assertion<T> {
 *     eq<R = T>(expectedValue: R): Assertion<R>;
 *     equal<R = T>(expectedValue: R): Assertion<R>;
 *     equals<R = T>(expectedValue: R): Assertion<R>;
 *   }
 * }
 *
 * // add the methods to expect for runtime usage
 * extendMethods({
 *   equal: equal,
 *   equals: equal,
 *   eq: equal
 * });
 * ```
 *
 * @see {@link extendNegations}, {@link extendNOPs}
 *
 * @public
 */
export function extendMethods(methods: CustomMethodImpls<never>) {
  assertionMethods = {
    ...assertionMethods,
    ...(methods as CustomMethodImpls<unknown>),
  };
}

/**
 * @internal
 */
export function getMethodExtensions(): Readonly<typeof assertionMethods> {
  return assertionMethods;
}
