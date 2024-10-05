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
  `Expected ${place.name} to ${place.not} be `
)
  .suffix(`, but it ${place.reason}`)
  .negationSuffix(", but it was")
  .nestedMetadata({
    [place.path]: place.actual.value,
  });

function verifyEvenOdd(
  message: ExpectMessageBuilder,
  actual: unknown,
  even: boolean
) {
  if (actual === undefined) {
    return message.name("the value").failWithReason("was undefined");
  }

  if (!typeIs(actual, "number")) {
    return message
      .name(`${place.actual.value} (${place.actual.type})`)
      .failWithReason("wasn't a number");
  }

  if (even) {
    return actual % 2 === 0
      ? message.pass()
      : message.failWithReason("was odd");
  } else {
    return actual % 2 === 0
      ? message.failWithReason("was even")
      : message.pass();
  }
}

const even: CustomMethodImpl = (_, actual) => {
  const message = baseMessage.use(`even`);

  return verifyEvenOdd(message, actual, true);
};

const odd: CustomMethodImpl = (_, actual) => {
  const message = baseMessage.use(`odd`);

  return verifyEvenOdd(message, actual, false);
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Asserts that the actual value is an even number.
     *
     * @remarks
     * An even number is one that can be divided by 2, without any remainder.
     *
     * @example
     * ```ts
     * expect(4).to.be.even();
     * ```
     *
     * @see {@link Assertion.odd | odd}
     *
     * @public
     */
    even(): Assertion<number>;

    /**
     * Asserts that the actual value is an odd number.
     *
     * @remarks
     * An odd number is one that has a remainder when divided by 2.
     *
     * That is, it can not be evenly divided by 2.
     *
     * @example
     * ```ts
     * expect(3).to.be.odd();
     * ```
     *
     * @see {@link Assertion.even | even}
     *
     * @public
     */
    odd(): Assertion<number>;
  }
}

extendMethods({
  even: even,
  odd: odd,
});
