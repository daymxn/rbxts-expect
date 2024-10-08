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
  `Expected ${place.name} to ${place.not} be a finite number`
)
  .trailingFailureSuffix(`, but it ${place.reason}`)
  .negationSuffix(", but it was")
  .nestedMetadata({
    [place.path]: place.actual.value,
  });

const finite: CustomMethodImpl = (_, actual) => {
  const message = baseMessage.use();

  if (actual === undefined) {
    return message.name("the value").failWithReason("was undefined");
  }

  if (!typeIs(actual, "number")) {
    return message
      .name(`${place.actual.value} (${place.actual.type})`)
      .failWithReason("wasn't a number");
  }

  if (math.huge === actual) {
    return message.failWithReason("was 'math.huge'");
  }

  if (-math.huge === actual) {
    return message.failWithReason("was '-math.huge'");
  }

  return message.pass();
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Asserts that the actual value is a number within `+-math.huge`.
     *
     * @remarks
     * This comparison is exclusive, meaning a number that is `math.huge` or
     * `-math.huge` is considered a fail.
     *
     * @example
     * ```ts
     * expect(5).to.be.finite();
     * expect(-5).to.be.finite();
     *
     * expect("5").to.not.be.finite();
     * expect(math.huge).to.not.be.finite();
     * ```
     *
     * @public
     */
    finite(): Assertion<number>;
  }
}

extendMethods({
  finite: finite,
});
