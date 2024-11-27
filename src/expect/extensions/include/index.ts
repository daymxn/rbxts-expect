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

const baseMessage = new ExpectMessageBuilder(`Expected ${place.name} to ${place.not} include ${place.expected.value}`)
  .trailingFailureSuffix(", but it was missing")
  .nestedMetadata({
    [place.path]: place.actual.value,
  });

const include: CustomMethodImpl<unknown[]> = (_, actual, expectedValue: defined) => {
  const message = baseMessage.use().expectedValue(expectedValue);

  if (actual === undefined) {
    return message.name("the value").trailingFailureSuffix(", but it was undefined").fail();
  }

  if (typeOf(actual) !== "table") {
    return message
      .name(`${place.actual.value} (${place.actual.type})`)
      .trailingFailureSuffix(", but it wasn't an array")
      .fail();
  }

  return (actual as defined[]).includes(expectedValue) ? message.pass() : message.fail();
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Asserts that the `expectedValue` is a value in the array.
     *
     * @remarks
     * The value is looked for in a _shallow_ context.
     *
     * For strings, use the {@link Assertion.substring | substring} method.
     *
     * @param expectedValue - A value that should be included in the array.
     *
     * @example
     * ```ts
     * expect([1,2,3]).to.include(1);
     * expect([1]).to.not.include(2);
     * ```
     *
     * @public
     */
    include(expectedValue: InferArrayElement<T>): this;

    /**
     * Asserts that the `expectedValue` is a value in the array.
     *
     * @remarks
     * _Type alias for {@link Assertion.include | include}._
     *
     * @public
     */
    includes(expectedValue: InferArrayElement<T>): this;
  }
}

extendMethods({
  include: include,
  includes: include,
});
