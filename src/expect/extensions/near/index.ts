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

const EPSILON = 2.220_446_049_250_313e-16;

const baseMessage = new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} be a number close to ${place.expected.value}`,
)
  .trailingFailureSuffix(`, but it ${place.reason}`)
  .negationSuffix(", but it was")
  .nestedMetadata({
    [place.path]: place.actual.value,
  });

const near: CustomMethodImpl = (_, actual, target: number, margin: number = EPSILON) => {
  const message = baseMessage.use().expectedValue(target);

  if (actual === undefined) {
    return message.name("the value").failWithReason("was undefined");
  }

  if (!typeIs(actual, "number")) {
    return message.name(`${place.actual.value} (${place.actual.type})`).failWithReason("wasn't a number");
  }

  const difference = target - actual;

  if (math.abs(difference) <= margin) return message.pass();

  return difference > 0 ? message.failWithReason("was too low") : message.failWithReason("was too high");
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Asserts that the actual value is a number within epsilon of `value`.
     *
     * @remarks
     * An epsilon is the smallest number representable by a 64 bit double.
     *
     * Specifically, this method uses the IEEE 754 standard of `2.220446049250313e-16`.
     *
     * @param value - The number that the actual value should be within epsilon of.
     *
     * @example
     * ```ts
     * const epsilon = 2.220446049250313e-16;
     * expect(10-epsilon).to.be.near(10);
     * ```
     *
     * @see {@link Assertion.closeTo | closeTo}
     *
     * @public
     */
    near(value: number): Assertion<number>;

    /**
     * Asserts that the actual value is a number within `margin` of `value`.
     *
     * @remarks
     * The margin is considered _inclusive_; if the actual value is exactly
     * `value` +- `margin` then it's considered a pass.
     *
     * @param value - The number that the actual value should be `margin` of.
     * @param margin - A range of which the actual value should be +-`value` in.
     *
     * @example
     * ```ts
     * expect(11).to.be.near(10, 1);
     * expect(100).to.be.near(125, 50);
     * expect(5.005).to.be.near(5, .01)
     * ```
     *
     * @see {@link Assertion.closeTo | closeTo}
     *
     * @public
     */
    near(value: number, margin: number): Assertion<number>;

    /**
     * Asserts that the actual value is a number within epsilon of `value`.
     *
     * @remarks
     * _Type alias for {@link Assertion.near | near}._
     *
     * @param value - The number that the actual value should be within epsilon of.
     *
     * @example
     * ```ts
     * const epsilon = 2.220446049250313e-16;
     * expect(10-epsilon).to.be.closeTo(10);
     * ```
     *
     * @public
     */
    closeTo(value: number): Assertion<number>;

    /**
     * Asserts that the actual value is a number within `margin` of `value`.
     *
     * @remarks
     * _Type alias for {@link Assertion.near | near}._
     *
     * @param value - The number that the actual value should be `margin` of.
     * @param margin - A range of which the actual value should be +-`value` in.
     *
     * @example
     * ```ts
     * expect(11).to.be.closeTo(10, 1);
     * expect(100).to.be.closeTo(125, 50);
     * expect(5.005).to.be.closeTo(5, .01)
     * ```
     *
     * @public
     */
    closeTo(value: number, margin: number): Assertion<number>;
  }
}

extendMethods({
  near: near,
  closeTo: near,
});
