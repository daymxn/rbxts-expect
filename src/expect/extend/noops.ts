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

import type { expect, extendMethods, extendNegations } from "@src/expect";

const nopMethods: Set<string> = new Set();

/**
 * Add additional NOOPs to {@link expect}.
 *
 * @remarks
 * A NOOP is a property that does nothing. It's just there
 * to make the test easier to read.
 *
 * For example:
 * ```ts
 * expect("Daymon").to.have.the.substring("Day");
 * ```
 *
 * In this case, `to`, `have`, and `the` are all NOOPs.
 *
 * @param methods - An array of property names to use as NOOPs
 *
 * @example
 * ```ts
 * // augment the expect module so typescript knows the properties exists
 * declare module "@rbxts/expect" {
 *   interface Assertion<T> {
 *     readonly to: this;
 *     readonly have: this;
 *     readonly the: this;
 *   }
 * }
 *
 * // add the properties to expect for runtime usage
 * extendNOPs(["to", "have", "the"]);
 * ```
 *
 * @see {@link extendMethods}, {@link extendNegations}
 *
 * @public
 */
export function extendNOPs(methods: ReadonlyArray<string>) {
  for (const it of methods) nopMethods.add(it);
}

/**
 * @internal
 */
export function getNOPExtensions(): ReadonlySet<string> {
  return nopMethods;
}
