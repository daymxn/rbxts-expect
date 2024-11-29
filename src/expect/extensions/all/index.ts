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

const baseMessage = new ExpectMessageBuilder(`Expected ${place.name} to ${place.not} all ${place.reason}`)
  .negationSuffix(`, but they did`)
  .reason("pass some check")
  .nestedMetadata({
    [place.path]: place.actual.value,
  });

const all: CustomMethodImpl<unknown[]> = (
  source,
  actual,
  reasonOrCallback: string | Filter,
  maybeCallback?: Filter,
) => {
  const message = baseMessage.use();

  if (typeIs(reasonOrCallback, "string")) {
    message.reason(reasonOrCallback);
  }

  if (actual === undefined) {
    return message.name("the values").trailingFailureSuffix(", but it was undefined").fail();
  }

  const actualIsArray = source.is_array ?? isArray(actual);
  if (!actualIsArray) return message.trailingFailurePrefix(", but it wasn't an array").fail();

  const callback = (maybeCallback ?? reasonOrCallback) as Filter;

  for (const [Index, value] of ipairs(actual)) {
    const result = callback(value as never);

    if (!result) {
      return message
        .trailingFailureSuffix(", but there was an element that failed the check")
        .metadata({
          Index,
          Value: message.encode(value),
        })
        .fail();
    }
  }

  return message.pass();
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Asserts that all elements in the array satisfy the specified {@link Filter}.
     *
     * @param condition - A callback that returns `true` whenever the condition is met.
     *
     * @example
     * ```ts
     * expect(["Bryce", "Bryan"]).to.all(it => startsWith(it, "Bry"));
     * expect([1,3,4,5]).to.not.all(it => it % 2 === 0);
     * ```
     *
     * @public
     */
    all(condition: Filter<InferArrayElement<T>>): this;

    /**
     * Asserts that all elements in the array satisfy the specified {@link Filter}.
     *
     * @param reason - A {@link Placeholder.reason | reason} to add at the end of the message for additional context.
     * @param condition - A callback that returns `true` whenever the condition is met.
     *
     * @example
     * ```ts
     * expect(["Bryce", "Bryan"]).to.all('start with "Bry"', it => startsWith(it, "Bry"));
     * expect([1,3,4,5]).to.not.all('be even', it => it % 2 === 0);
     * ```
     *
     * Example message:
     * ```logs
     * Expected '[1,2,3]' to all be even, but there was an element that failed the check
     *
     * Index: 1
     * Value: '1'
     * ```
     *
     * @public
     */
    all(reason: string, condition: Filter<InferArrayElement<T>>): this;
  }
}

extendMethods({
  all: all,
});
