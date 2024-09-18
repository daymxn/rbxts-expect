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
  `Expected ${place.name} to ${place.not} have `
)
  .nestedMetadata({ [place.path]: place.actual.value })
  .negationSuffix(`, but it did`);

function validateObjectIsSize(actual: object, size: number) {
  const message = baseMessage
    .use(`exactly ${place.expected.value} key(s)`)
    .name("the object")
    .surfaceMetadata({ Value: place.actual.value })
    .expectedValue(size);

  const entries = Object.entries(actual);
  const amount = entries.size();

  if (amount === size) return message.pass();

  return message.suffix(`, but it actually had '${amount}'`).fail();
}

function validateArrayIsSize(actual: defined[], size: number) {
  const message = baseMessage
    .use(`exactly ${place.expected.value} element(s)`)
    .expectedValue(size);

  if (actual.isEmpty()) return message.pass();

  const actualSize = actual.size();

  if (actualSize === size) return message.pass();

  return message.suffix(`, but it actually had '${actualSize}'`).fail();
}

function validateStringIsSize(actual: string, size: number) {
  const message = baseMessage
    .use(`a size of exactly ${place.expected.value}`)
    .expectedValue(size);

  const actualSize = actual.size();

  if (actualSize === size) return message.pass();

  return message
    .suffix(`, but it actually had a size of '${actualSize}'`)
    .fail();
}

const lengthOf: CustomMethodImpl<unknown> = (source, actual, size: number) => {
  const message = baseMessage
    .use(`a size of ${place.expected.value}`)
    .expectedValue(size);

  if (typeIs(actual, "table")) {
    // incase they ran this before running an.array()
    if (source.is_array || isArray(actual)) {
      return validateArrayIsSize(actual as defined[], size);
    } else {
      return validateObjectIsSize(actual, size);
    }
  } else if (typeIs(actual, "string")) {
    return validateStringIsSize(actual, size);
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
    length(size: number): this;
    lengthOf(size: number): this;
    size(size: number): this;
    sizeOf(size: number): this;
  }
}

extendMethods({
  length: lengthOf,
  lengthOf: lengthOf,
  size: lengthOf,
  sizeOf: lengthOf,
});
