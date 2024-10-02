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
    /**
     * Asserts that the value has a length of `size`.
     *
     * @remarks
     * Works with strings or iterable types.
     *
     * An object's size is measured by its keys.
     *
     * A string's size is measured by its characters.
     *
     * An iterable's size is measured by its elements.
     *
     * @param size - The length that the "actual" value should have.
     *
     * @returns This instance for chaining.
     *
     * @example
     * ```ts
     * expect([1,2,3]).to.have.a.length(3);
     * expect({ name: "Daymon", age: 5 }).to.have.a.length(2);
     * expect("Daymon").to.have.a.length(6);
     * ```
     *
     * @public
     */
    length(size: number): this;

    /**
     * Asserts that the value has a length of `size`.
     *
     * @remarks
     * _Type alias for {@link Assertion.length | length}._
     *
     * @example
     * ```ts
     * expect([1,2,3]).to.have.a.lengthOf(3);
     * expect({ name: "Daymon", age: 5 }).to.have.a.lengthOf(2);
     * expect("Daymon").to.have.a.lengthOf(6);
     * ```
     *
     * @public
     */
    lengthOf(size: number): this;

    /**
     * Asserts that the value has a length of `size`.
     *
     * @remarks
     * _Type alias for {@link Assertion.length | length}._
     *
     * @example
     * ```ts
     * expect([1,2,3]).to.have.the.size(3);
     * expect({ name: "Daymon", age: 5 }).to.have.the.size(2);
     * expect("Daymon").to.have.the.size(6);
     * ```
     *
     * @public
     */
    size(size: number): this;

    /**
     * Asserts that the value has a length of `size`.
     *
     * @remarks
     * _Type alias for {@link Assertion.length | length}._
     *
     * @example
     * ```ts
     * expect([1,2,3]).to.have.a.sizeOf(3);
     * expect({ name: "Daymon", age: 5 }).to.have.a.sizeOf(2);
     * expect("Daymon").to.have.a.sizeOf(6);
     * ```
     *
     * @public
     */
    sizeOf(size: number): this;
  }
}

extendMethods({
  length: lengthOf,
  lengthOf: lengthOf,
  size: lengthOf,
  sizeOf: lengthOf,
});
