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

import { extendNegations } from "@src/expect/extend";

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Negates the assertion.
     *
     * @example
     * ```ts
     * expect(5).to.not.equal(4);
     * ```
     *
     * @public
     */
    readonly not: this;

    /**
     * Negates the assertion.
     *
     * @example
     * ```ts
     * expect(5).to.never.equal(4);
     * ```
     *
     * @public
     */
    readonly never: this;
  }
}

extendNegations(["not", "never"]);
