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
import { matches } from "@src/util/string";

const baseMessage = new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} throw`
);

const throws: CustomMethodImpl<Callback> = (
  source,
  actual,
  substring?: string
) => {
  const message = baseMessage.use();

  const functionName = debug.info(actual, "n")[0] ?? "";
  message.name(functionName !== "" ? functionName : "the function");

  if (substring !== undefined) {
    message.appendPrefix(` with the substring "${substring}"`);
  }

  try {
    actual();

    return message.suffix(", but it didn't throw at all").fail();
  } catch (e) {
    const err = e as string;

    if (substring !== undefined) {
      return includes(err, substring)
        ? message.metadata({ ErrorMessage: err }).pass()
        : message.suffix(`, but it threw a message without it:\n${err}`).fail();
    } else {
      return message
        .negationSuffix(`, but it did with the message:\n${err}`)
        .pass();
    }
  }
};

const throwsMatch: CustomMethodImpl<Callback> = (
  source,
  actual,
  pattern: string
) => {
  const message = baseMessage.use(` with a message that matched /${pattern}/`);

  const functionName = debug.info(actual, "n")[0] ?? "";
  message.name(functionName !== "" ? functionName : "the function");

  try {
    actual();

    return message.suffix(", but it didn't throw at all.").fail();
  } catch (e) {
    const err = e as string;

    return matches(err, pattern)
      ? message.metadata({ Error: err }).pass()
      : message.suffix(`, but it threw a message without it: "${err}"`).fail();
  }
};

// TODO(): use typescript to restrict the type to functions
declare module "@rbxts/expect" {
  interface Assertion<T> {
    throws(): Assertion<T>;
    throws(substring: string): Assertion<T>;

    throw(): Assertion<T>;
    throw(substring: string): Assertion<T>;

    throwsMatch(pattern: string): Assertion<T>;
    throwMatch(pattern: string): Assertion<T>;
  }
}

extendMethods({
  throws: throws,
  throw: throws,

  throwMatch: throwsMatch,
  throwsMatch: throwsMatch,
});
