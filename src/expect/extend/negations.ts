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

import type { expect, extendMethods, extendNOPs } from "@src/expect";

const negations: Set<string> = new Set();

/**
 * Add additional negations to {@link expect}.
 *
 * @remarks
 * A negation is a property that flips an assertion.
 *
 * For example:
 * ```ts
 * expect(5).to.not.equal(4);
 * ```
 *
 * In this case, `not` is the negation.
 *
 * Instead of checking if `5 === 5`, we are now
 * checking if `5 !== 5`.
 *
 * Note that negations flip one another, so this passes:
 * ```ts
 * expect(5).to.never.not.equal(4);
 * ```
 *
 * @param methods - An array of property names to use as negations
 *
 * @example
 * ```ts
 * // augment the expect module so typescript knows the properties exists
 * declare module "@rbxts/expect" {
 *   interface Assertion<T> {
 *     readonly not: this;
 *     readonly never: this;
 *   }
 * }
 *
 * // add the properties to expect for runtime usage
 * extendNegations(["not", "never"]);
 * ```
 *
 * @see {@link extendMethods}, {@link extendNOPs}
 *
 * @public
 */
export function extendNegations(methods: ReadonlyArray<string>) {
  methods.forEach((it) => negations.add(it));
}

/**
 * @internal
 */
export function getNegationExtensions(): ReadonlySet<string> {
  return negations;
}
