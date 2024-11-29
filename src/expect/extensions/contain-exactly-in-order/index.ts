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

import { deepEqual, FailureType } from "@rbxts/deep-equal";
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

const containExactlyInOrder: CustomMethodImpl<unknown[]> = (_, actual, expectedValue: defined[]) => {
  const message = baseMessage.use().expectedValue(expectedValue);

  if (actual === undefined) {
    return message.name("the value").failWithReason("was undefined");
  }

  if (typeOf(actual) !== "table") {
    return message.name(`${place.actual.value} (${place.actual.type})`).failWithReason("wasn't an array");
  }

  const result = deepEqual(actual, expectedValue, {
    checkRightMissing: true,
    inOrder: true,
  });

  if (result) {
    switch (result.failType) {
      case FailureType.DIFFERENT_TYPES: {
        if (result.rightValue === undefined) {
          return message
            .metadata({
              ["Extra element"]: message.encode(result.leftValue),
            })
            .failWithReason("had an extra element");
        }

        return message
          .metadata({
            [`Expected ${result.path}`]: `${message.encode(result.rightValue)} (${result.rightType})`,
            [`Actual ${result.path}`]: `${message.encode(result.leftValue)} (${result.leftType})`,
          })
          .failWithReason(`had a different type of element at '${result.path}'`);
      }
      case FailureType.DIFFERENT_REFERENCE: {
        return message
          .metadata({
            [`Expected ${result.path}`]: message.encode(result.rightValue),
            [`Actual ${result.path}`]: message.encode(result.leftValue),
          })
          .failWithReason(`had a different reference for the element at '${result.path}' (${result.leftType})`);
      }
      case FailureType.MISSING_ARRAY_VALUE: {
        return result.leftMissing.isEmpty()
          ? message
              .metadata({
                ["Extra elements"]: message.encode(result.rightMissing),
              })
              .failWithReason("had extra elements")
          : message
              .metadata({
                ["Missing elements"]: message.encode(result.leftMissing),
              })
              .failWithReason("was missing elements");
      }
      default: {
        if (result.leftValue === undefined) {
          return message
            .metadata({
              [`Missing element`]: message.encode(result.rightValue),
            })
            .failWithReason(`was missing an element`);
        } else if (result.rightValue === undefined) {
          return message
            .metadata({
              [`Extra element`]: message.encode(result.leftValue),
            })
            .failWithReason(`had an extra element`);
        } else {
          return message
            .metadata({
              [`Expected ${result.path}`]: message.encode(result.rightValue),
              [`Actual ${result.path}`]: message.encode(result.leftValue),
            })
            .failWithReason(`had a different value for the element at '${result.path}'`);
        }
      }
    }
  }

  return message.pass();
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Asserts that the array contains all of the values in `expectedValues`,
     * with nothing more or less, and in the same order.
     *
     * @remarks
     * There shouldn't be any extra elements in the actual array;
     * both arrays should **deeply** contain the same elements, and in the same order.
     *
     * @param expectedValues - An array of elements that the actual array should be.
     *
     * @example
     * ```ts
     * expect([1,2,3]).to.containExactlyInOrder([1,2,3]);
     * expect([1,2,3]).to.not.containExactlyInOrder([1,3,2]);
     * ```
     *
     * @public
     */
    containExactlyInOrder(expectedValues: InferArrayElement<T>[]): this;

    /**
     * Asserts that the array contains all of the values in `expectedValues`,
     * with nothing more or less, and in the same order.
     *
     * @remarks
     * _Type alias for {@link Assertion.containExactlyInOrder | containExactlyInOrder}._
     *
     * @public
     */
    containsExactlyInOrder(expectedValues: InferArrayElement<T>[]): this;
  }
}

extendMethods({
  containExactlyInOrder: containExactlyInOrder,
  containsExactlyInOrder: containExactlyInOrder,
});
