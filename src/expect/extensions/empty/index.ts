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

import Object from "@rbxts/object-utils";
import { CustomMethodImpl, extendMethods } from "@src/expect/extend";
import { ExpectMessageBuilder } from "@src/message";
import { place } from "@src/message/placeholders";
import { isArray } from "@src/util/object";

const baseMessage = new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} be empty`
).nestedMetadata({ [place.path]: place.actual.value });

function validateObjectIsEmpty(actual: object) {
  const message = baseMessage.use().name("the object");

  const entries = Object.entries(actual);
  if (entries.isEmpty()) return message.pass();

  const amount = entries.size();
  if (amount > 1) {
    return message
      .suffix(`, but it had ${amount} keys`)
      .surfaceMetadata({ Value: place.actual.value })
      .fail();
  } else {
    const [key, value] = entries[0];

    return message
      .suffix(`, but it had the key '${key}'`)
      .expectedValue(value)
      .surfaceMetadata({ [`Value of [${key}]`]: place.expected.value })
      .fail();
  }
}

function validateArrayIsEmpty(actual: defined[]) {
  const message = baseMessage.use();

  if (actual.isEmpty()) return message.pass();

  const amount = actual.size();

  if (amount > 1) {
    return message.suffix(`, but it had ${amount} elements`).fail();
  } else {
    return message.suffix(`, but it had an element`).fail();
  }
}

function validateStringIsEmpty(actual: string) {
  const message = baseMessage.use();

  if (actual.size() === 0) return message.pass();

  return message.suffix(", but it was not").fail();
}

const empty: CustomMethodImpl = (source, actual) => {
  const message = baseMessage.use();

  if (typeIs(actual, "table")) {
    // incase they ran this before running an.array()
    if (source.is_array || isArray(actual)) {
      return validateArrayIsEmpty(actual as defined[]);
    } else {
      return validateObjectIsEmpty(actual);
    }
  } else if (typeIs(actual, "string")) {
    return validateStringIsEmpty(actual);
  } else if (actual === undefined) {
    return message.suffix(", but it was undefined").fail();
  } else {
    return message
      .suffix(
        `, but it was not a 'string' or iterable type. Instead, it was a '${place.actual.type}'`
      )
      .fail();
  }
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Asserts that the value is empty.
     *
     * @remarks
     * Works with strings or iterable types.
     *
     * An object is empty when it has no keys.
     *
     * A string is empty when it has no characters.
     *
     * An iterable is empty when it has no elements.
     *
     * @example
     * ```ts
     * expect([]).to.be.empty();
     * expect({}).to.be.empty();
     * expect("").to.be.empty();
     * ```
     *
     * @public
     */
    empty(): Assertion<T>;
  }
}

extendMethods({
  empty: empty,
});
