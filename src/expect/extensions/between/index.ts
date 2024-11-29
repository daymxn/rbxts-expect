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

const baseMessage = new ExpectMessageBuilder(`Expected ${place.name} to ${place.not} be a number between `)
  .negationSuffix(", but it was")
  .nestedMetadata({
    [place.path]: place.actual.value,
  });

const between: CustomMethodImpl = (_, actual, minValue: number, maxValue: number) => {
  const message = baseMessage.use(`${minValue} and ${maxValue}`).trailingFailureSuffix(`, but it ${place.reason}`);

  if (maxValue < minValue)
    warn(
      `"between" called with a 'maxValue' that is less than the 'minValue'.`,
      "This is undefined behavior, and may behave unexpectedly.",
      `\nminValue: ${minValue}`,
      `\nmaxValue: ${maxValue}`,
    );

  if (actual === undefined) {
    return message.name("the value").failWithReason("was undefined");
  }

  if (!typeIs(actual, "number")) {
    return message.name(`${place.actual.value} (${place.actual.type})`).failWithReason("wasn't a number");
  }

  if (actual > maxValue) return message.failWithReason("was too high");
  if (actual < minValue) return message.failWithReason("was too low");

  return message.pass();
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Asserts that the actual value is a number within a specified range.
     *
     * @remarks
     * The check is performed **inclusively**, so an actual value of `2` and
     * a `minValue` of `2` is considered a pass.
     *
     * @param minValue - The lower end of what this value can be.
     * @param maxValue - The higher end of what this value can be.
     *
     * @example
     * ```ts
     * expect(10).to.be.between(5, 15);
     * expect(5).to.be.between(5, 6);
     * ```
     *
     * @see {@link Assertion.within | within}
     *
     * @public
     */
    between(minValue: number, maxValue: number): Assertion<number>;

    /**
     * Asserts that the actual value is a number within a specified range.
     *
     * @remarks
     * _Type alias for {@link Assertion.between | between}._
     *
     * @param minValue - The lower end of what this value can be.
     * @param maxValue - The higher end of what this value can be.
     *
     * @example
     * ```ts
     * expect(10).to.be.within(5, 15);
     * expect(5).to.be.within(5, 6);
     * ```
     *
     * @public
     */
    within(minValue: number, maxValue: number): Assertion<number>;
  }
}

extendMethods({
  between: between,
  within: between,
});
