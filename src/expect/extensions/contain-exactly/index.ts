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

import { deepEqual } from "@rbxts/deep-equal";
import { CustomMethodImpl, extendMethods } from "@src/expect/extend";
import { ExpectMessageBuilder } from "@src/message";
import { place } from "@src/message/placeholders";

const baseMessage = new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} contain exactly ${place.expected.value}`,
)
  .trailingFailurePrefix(`, but it ${place.reason}`)
  .nestedMetadata({
    [place.path]: place.actual.value,
  });

const containExactly: CustomMethodImpl<unknown[]> = (_, actual, expectedValue: defined[]) => {
  const message = baseMessage.use().expectedValue(expectedValue);

  if (actual === undefined) {
    return message.name("the value").failWithReason("was undefined");
  }

  if (typeOf(actual) !== "table") {
    return message.name(`${place.actual.value} (${place.actual.type})`).failWithReason("wasn't an array");
  }

  const result = deepEqual(actual, expectedValue, { checkRightMissing: true });

  if (result) {
    const hasMissing = !result.leftMissing.isEmpty();
    const hasExtra = !result.rightMissing.isEmpty();

    if (hasMissing && hasExtra) {
      return message
        .metadata({ ["Extra elements"]: message.encode(result.rightMissing) })
        .metadata({ ["Missing elements"]: message.encode(result.leftMissing) })
        .failWithReason("was elements missing and it had extra elements");
    } else if (hasMissing) {
      return message
        .metadata({ ["Missing elements"]: message.encode(result.leftMissing) })
        .failWithReason("was missing elements");
    } else {
      return message
        .metadata({ ["Extra elements"]: message.encode(result.rightMissing) })
        .failWithReason("had extra elements");
    }
  }

  return message.pass();
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Asserts that the array contains all of the values in `expectedValues`,
     * and nothing more or less.
     *
     * @remarks
     * Order doesn't matter, so long as the actual array has the same values
     * as the expected array.
     *
     * There shouldn't be any extra elements in the actual array either;
     * both arrays should **deeply** contain the same elements, with no regard to the ordering of elements.
     *
     * @param expectedValues - An array of elements that the actual array should be.
     *
     * @example
     * ```ts
     * expect([1,2,3]).to.containExactly([2,1,3]);
     * expect([1,2]).to.not.containExactly([1,2,3]);
     * expect([1,2,3]).to.not.containExactly([1,2]);
     * ```
     *
     * @public
     */
    containExactly(expectedValues: InferArrayElement<T>[]): this;

    /**
     * Asserts that the array contains all of the values in `expectedValues`,
     * and nothing more or less.
     *
     * @remarks
     * _Type alias for {@link Assertion.containExactly | containExactly}._
     *
     * @public
     */
    containsExactly(expectedValues: InferArrayElement<T>[]): this;
  }
}

extendMethods({
  containExactly: containExactly,
  containsExactly: containExactly,
});
