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

import { Assertion } from "@rbxts/expect";
import { startsWith } from "@rbxts/string-utils";
import { CustomMethodImpl, extendMethods } from "@src/expect/extend";
import { ExpectMessageBuilder } from "@src/message";
import { place } from "@src/message/placeholders";
import { getIndexOrNull, isArray } from "@src/util/object";

const baseMessage = new ExpectMessageBuilder(`Expected ${place.name} to ${place.not} be `)
  .trailingFailureSuffix(`, but it ${place.reason}`)
  .nestedMetadata({ [place.path]: place.actual.value })
  .negationSuffix(`, but it did`);

function validateArrayStartsWith(source: Assertion, actual: unknown, expected: defined[]) {
  const message = baseMessage.use(`an array that starts with ${place.expected.value}`).expectedValue(expected);

  if (actual === undefined) {
    return message.name("the value").failWithReason("was undefined");
  }

  if (!(source.is_array ?? isArray(actual))) {
    return message.name(`${place.actual.value} (${place.actual.type})`).failWithReason("wasn't an array");
  }

  const missing = expected.filter((it, index) => getIndexOrNull(actual, index) !== it);

  if (missing.isEmpty()) return message.pass();

  if (missing.size() === expected.size()) {
    return message.failWithReason("was missing all of them");
  } else if (missing.size() > 1) {
    return message
      .metadata({ Missing: message.encode(missing) })
      .failWithReason(`was missing ${missing.size()} elements`);
  } else {
    return message.failWithReason(`was missing ${message.encode(missing[0])}`);
  }
}

function validateStringStartsWith(actual: unknown, expected: string) {
  const message = baseMessage.use(`a string that starts with ${place.expected.value}`).expectedValue(expected);

  if (actual === undefined) {
    return message.name("the value").failWithReason("was undefined");
  }

  if (!typeIs(actual, "string")) {
    return message.name(`${place.actual.value} (${place.actual.type})`).failWithReason("wasn't a string");
  }

  return startsWith(actual, expected) ? message.pass() : message.failWithReason("was missing");
}

const startWith: CustomMethodImpl = (source, actual, expected: string | defined[]) => {
  return typeIs(expected, "string")
    ? validateStringStartsWith(actual, expected)
    : validateArrayStartsWith(source, actual, expected);
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Asserts that the array starts with the specified elements.
     *
     * @param elements - Elements that the actual array should have at the start.
     *
     * @returns This instance for chaining.
     *
     * @example
     * ```ts
     * expect([1,2,3]).to.startWith([1,2]);
     * ```
     *
     * @public
     */
    startWith(elements: InferArrayElement<T>[]): this;

    /**
     * Asserts that the actual value is a string that starts with
     * the specified string.
     *
     * @param str - A string that should be at the start of the actual value.
     *
     * @returns This instance for chaining.
     *
     * @example
     * ```ts
     * expect("Daymon").to.startWith("Day");
     * ```
     *
     * @public
     */
    startWith(str: string): Assertion<string>;

    /**
     * Asserts that the array starts with the specified elements.
     *
     * @remarks
     * _Type alias for {@link Assertion.startWith | startWith}._
     *
     * @param elements - Elements that the actual array should have at the start.
     *
     * @returns This instance for chaining.
     *
     * @example
     * ```ts
     * expect([1,2,3]).to.be.an.array().that.startsWith([1,2]);
     * ```
     *
     * @public
     */
    startsWith(elements: InferArrayElement<T>[]): this;

    /**
     * Asserts that the actual value is a string that starts with
     * the specified string.
     *
     * @remarks
     * _Type alias for {@link Assertion.startWith | startWith}._
     *
     * @param str - A string that should be at the start of the actual value.
     *
     * @returns This instance for chaining.
     *
     * @example
     * ```ts
     * expect("Daymon").to.be.a.string().that.startsWith("Day");
     * ```
     *
     * @public
     */
    startsWith(str: string): Assertion<string>;
  }
}

extendMethods({
  startWith: startWith,
  startsWith: startWith,
});
