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

import { Filter } from "@rbxts/expect";
import { CustomMethodImpl, extendMethods } from "@src/expect/extend";
import { ExpectMessageBuilder } from "@src/message";
import { place } from "@src/message/placeholders";

const baseMessage = new ExpectMessageBuilder(`Expected ${place.name} to ${place.not} satisfy `)
  .name(`${place.actual.value} (${place.actual.type})`)
  .nestedMetadata({
    [place.path]: `${place.actual.value} (${place.actual.type})`,
  });

const satisfy: CustomMethodImpl = (_, actual, expected: Filter) => {
  const maybeName = debug.info(expected, "n")[0] ?? "";
  const name = maybeName === "" ? "a given callback" : maybeName;

  const message = baseMessage.use(name);

  const result = expected(actual);

  return result ? message.pass() : message.trailingFailureSuffix(", but it didn't").fail();
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Asserts that the value returns true for the given `filter`.
     *
     * @remarks
     * If the passed `filter` is a named function, the function's name
     * will be used in the failure messages.
     *
     * @param filter - Callback that returns true if the value passes.
     *
     * @returns This instance for chaining.
     *
     * @example
     * ```ts
     * expect(5).to.satisfy((it) => it >= 0);
     * ```
     *
     * @public
     */
    satisfy(filter: Filter<T>): this;

    /**
     * Asserts that the value returns true for the given `filter`.
     *
     * @remarks
     * _Type alias for {@link Assertion.satisfy | satisfy}._
     *
     * @param filter - Callback that returns true if the value passes.
     *
     * @returns This instance for chaining.
     *
     * @example
     * ```ts
     * expect(5).to.be.a.number().that.satisfies((it) => it >= 0);
     * ```
     *
     * @public
     */
    satisfies(filter: Filter<T>): this;
  }
}

extendMethods({
  satisfy: satisfy,
  satisfies: satisfy,
});
