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

import { CustomMethodImpl, extendMethods } from "@src/expect/extend";
import { ExpectMessageBuilder } from "@src/message";
import { place } from "@src/message/placeholders";

const baseMessage = new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} have a match for the pattern `
)
  .trailingFailureSuffix(`, but it ${place.reason}`)
  .negationSuffix(", but it did")
  .nestedMetadata({
    [place.path]: place.actual.value,
  });

const hasPattern: CustomMethodImpl = (_, actual, pattern: string) => {
  const message = baseMessage.use(`/${pattern}/`);

  if (actual === undefined) {
    return message.name("the value").failWithReason("was undefined");
  }

  if (!typeIs(actual, "string")) {
    return message
      .name(`${place.actual.value} (${place.actual.type})`)
      .failWithReason("wasn't a string");
  }

  const match = actual.match(pattern);

  if (match.isEmpty()) return message.failWithReason("was missing");

  return message
    .metadata({
      Match: message.encode(match[0]),
    })
    .pass();
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Asserts that the `expectedValue` is a string that contains
     * a match for the provided lua `pattern`.
     *
     * @param pattern - A [roblox string pattern](https://create.roblox.com/docs/luau/strings#string-pattern-reference) that
     * the actual string should have a valid match for.
     *
     * @example
     * ```ts
     * expect("Daymon").to.have.the.pattern("^%u");
     * ```
     *
     * @see {@link Assertion.substring | substring}
     *
     * @public
     */
    pattern(pattern: string): this;
  }
}

extendMethods({
  pattern: hasPattern,
});
