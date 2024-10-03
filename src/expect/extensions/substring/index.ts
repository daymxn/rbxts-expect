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

import { includes } from "@rbxts/string-utils";
import { CustomMethodImpl, extendMethods } from "@src/expect/extend";
import { ExpectMessageBuilder } from "@src/message";
import { place } from "@src/message/placeholders";

const baseMessage = new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} have the substring ${place.expected.value}`
).nestedMetadata({
  [place.path]: place.actual.value,
});

const substring: CustomMethodImpl = (_, actual, str: string) => {
  const message = baseMessage.use().expectedValue(str);

  if (actual === undefined) {
    return message
      .name("the value")
      .trailingFailureSuffix(", but it was undefined")
      .fail();
  }

  if (!typeIs(actual, "string")) {
    return message
      .name(`${place.actual.value} (${place.actual.type})`)
      .trailingFailureSuffix(", but it wasn't a string")
      .fail();
  }

  return includes(actual, str) ? message.pass() : message.fail();
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Asserts that the string value contains the string `str`.
     *
     * @param str - A string that should be within the value.
     *
     * @example
     * ```ts
     * expect("daymon").to.have.the.substring("day");
     * ```
     *
     * @public
     */
    substring(str: string): Assertion<T>;
  }
}

extendMethods({
  substring: substring,
});
