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
  `Expected ${place.name} to ${place.not} be a `
)
  .trailingFailureSuffix(`, but it ${place.reason}`)
  .negationSuffix(", but it was")
  .nestedMetadata({
    [place.path]: place.actual.value,
  });

function verifyComparison(
  message: ExpectMessageBuilder,
  actual: unknown,
  positive: boolean
) {
  if (actual === undefined) {
    return message.name("the value").failWithReason("was undefined");
  }

  if (!typeIs(actual, "number")) {
    return message
      .name(`${place.actual.value} (${place.actual.type})`)
      .failWithReason("wasn't a number");
  }

  if (actual === 0) return message.failWithReason("was neutral");

  if (positive) {
    return actual > 0 ? message.pass() : message.fail();
  } else {
    return actual < 0 ? message.pass() : message.fail();
  }
}

const positive: CustomMethodImpl = (_, actual) => {
  const message = baseMessage.use(`positive number`).reason("was negative");

  return verifyComparison(message, actual, true);
};

const negative: CustomMethodImpl = (_, actual) => {
  const message = baseMessage.use(`negative number`).reason("was positive");

  return verifyComparison(message, actual, false);
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Asserts that the value is a positive number.
     *
     * @remarks
     * A positive number is any number greater than zero.
     *
     * @example
     * ```ts
     * expect(1).to.be.positive();
     *
     * expect(0).to.not.be.positive();
     * expect(-1).to.not.be.positive();
     * ```
     *
     * @see {@link Assertion.negative | negative}
     *
     * @public
     */
    positive(): Assertion<number>;

    /**
     * Asserts that the value is a negative number.
     *
     * @remarks
     * A negative number is any number less than zero.
     *
     * @example
     * ```ts
     * expect(-1).to.be.negative();
     *
     * expect(0).to.not.be.negative();
     * expect(1).to.not.be.negative();
     * ```
     *
     * @see {@link Assertion.positive | positive}
     *
     * @public
     */
    negative(): Assertion<number>;
  }
}

extendMethods({
  positive: positive,
  negative: negative,
});
