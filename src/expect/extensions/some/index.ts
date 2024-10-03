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

/* eslint-disable roblox-ts/no-array-pairs */

import type { Filter } from "@rbxts/expect";
import { CustomMethodImpl, extendMethods } from "@src/expect/extend";
import { ExpectMessageBuilder } from "@src/message";
import { place } from "@src/message/placeholders";
import { isArray } from "@src/util/object";

const baseMessage = new ExpectMessageBuilder(
  `Expected ${place.name} to have at least one element that ${place.reason}`,
  `Expected ${place.name} to ${place.not} have any elements that ${place.reason}`
)
  .reason("passes some check")
  .nestedMetadata({
    [place.path]: place.actual.value,
  });

const some: CustomMethodImpl<unknown[]> = (
  source,
  actual,
  reasonOrCallback: string | Filter,
  maybeCallback?: Filter
) => {
  const message = baseMessage.use();

  if (typeIs(reasonOrCallback, "string")) {
    message.reason(reasonOrCallback);
  }

  if (actual === undefined) {
    return message
      .name("the value")
      .trailingFailureSuffix(", but it was undefined")
      .fail();
  }

  const actualIsArray = source.is_array ?? isArray(actual);
  if (!actualIsArray)
    return message.trailingFailurePrefix(", but it wasn't an array").fail();

  const callback = (maybeCallback ?? reasonOrCallback) as Filter;

  for (const [index, value] of ipairs(actual)) {
    const result = callback(value as never);

    if (result) {
      return message
        .negationSuffix(`, but it did at index '${index}'`)
        .metadata({ [`Value of [${index}]`]: message.encode(value) })
        .pass();
    }
  }

  return message.fail();
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Asserts that at least one element in the array satisfies the specified {@link Filter}.
     *
     * @param condition - A callback that returns `true` whenever the condition is met.
     *
     * @example
     * ```ts
     * expect(["Daymon", "Bryan"]).to.have.some(it => startsWith(it, "Bry"));
     * expect([1,3,5]).to.not.have.some(it => it % 2 === 0);
     * ```
     *
     * @public
     */
    some(condition: Filter<InferArrayElement<T>>): this;

    /**
     * Asserts that at least one element in the array satisfies the specified {@link Filter}.
     *
     * @param reason - A {@link Placeholder.reason | reason} to add at the end of the message for additional context.
     * @param condition - A callback that returns `true` whenever the condition is met.
     *
     * @example
     * ```ts
     * expect(["Daymon", "Bryan"]).to.have.some("starts with bry", it => startsWith(it, "Bry"));
     * expect([1,3,5]).to.not.have.some("are even", it => it % 2 === 0);
     * ```
     *
     * Example message:
     * ```logs
     * Expected '[1,2,3]' to NOT have any elements that are even, but it did at index '2'
     *
     * Value of [2]: '2'
     * ```
     *
     * @public
     */
    some(reason: string, condition: Filter<InferArrayElement<T>>): this;
  }
}

extendMethods({
  some: some,
});
