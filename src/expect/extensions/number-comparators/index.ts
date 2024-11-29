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
  `Expected ${place.name} to ${place.not} be ${place.reason} ${place.expected.value}`,
)
  .negationSuffix(", but it was")
  .nestedMetadata({
    [place.path]: place.actual.value,
  });

function verifyComparison(
  message: ExpectMessageBuilder,
  actual: unknown,
  expected: number,
  greater: boolean,
  equal: boolean,
) {
  message.expectedValue(expected);

  if (actual === undefined) {
    return message.name("the value").trailingFailureSuffix(", but it was undefined").fail();
  }

  if (!typeIs(actual, "number")) {
    return message
      .name(`${place.actual.value} (${place.actual.type})`)
      .trailingFailureSuffix(", but it wasn't a number")
      .fail();
  }

  if (equal && actual === expected) {
    return message.negationSuffix(", but they were equal").pass();
  }

  if (greater) {
    return actual > expected ? message.pass() : message.fail();
  } else {
    return actual < expected ? message.pass() : message.fail();
  }
}

const greaterThan: CustomMethodImpl = (_, actual, expected: number) => {
  const message = baseMessage.use().reason("greater than");

  return verifyComparison(message, actual, expected, true, false);
};

const greaterThanOrEqualTo: CustomMethodImpl = (_, actual, expected: number) => {
  const message = baseMessage.use().reason("greater than or equal to");

  return verifyComparison(message, actual, expected, true, true);
};

const lessThan: CustomMethodImpl = (_, actual, expected: number) => {
  const message = baseMessage.use().reason("less than");

  return verifyComparison(message, actual, expected, false, false);
};

const lessThanOrEqualTo: CustomMethodImpl = (_, actual, expected: number) => {
  const message = baseMessage.use().reason("less than or equal to");

  return verifyComparison(message, actual, expected, false, true);
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Asserts that the value is greater than `value`.
     *
     * @param value - A number that the actual value should be greater than.
     *
     * @example
     * ```ts
     * expect(5).to.be.greaterThan(4);
     * ```
     *
     * @public
     */
    greaterThan(value: number): Assertion<number>;

    /**
     * Asserts that the value is greater than `value`.
     *
     * @remarks
     * _Type alias for {@link Assertion.greaterThan | greaterThan}._
     *
     * @param value - A number that the actual value should be greater than.
     *
     * @example
     * ```ts
     * expect(5).to.be.gt(4);
     * ```
     *
     * @public
     */
    gt(value: number): Assertion<number>;

    /**
     * Asserts that the value is greater than `value`.
     *
     * @remarks
     * _Type alias for {@link Assertion.greaterThan | greaterThan}._
     *
     * @param value - A number that the actual value should be greater than.
     *
     * @example
     * ```ts
     * expect(5).to.be.above(4);
     * ```
     *
     * @public
     */
    above(value: number): Assertion<number>;

    /**
     * Asserts that the value is greater than or equal to `value`.
     *
     * @param value - A number that the actual value should be greater than or equal to.
     *
     * @example
     * ```ts
     * expect(5).to.be.greaterThanOrEqualTo(4);
     * expect(2).to.be.greaterThanOrEqualTo(2);
     * ```
     *
     * @public
     */
    greaterThanOrEqualTo(value: number): Assertion<number>;

    /**
     * Asserts that the value is greater than or equal to `value`.
     *
     * @remarks
     * _Type alias for {@link Assertion.greaterThanOrEqualTo | greaterThanOrEqualTo}._
     *
     * @param value - A number that the actual value should be greater than or equal to.
     *
     * @example
     * ```ts
     * expect(5).to.be.gte(4);
     * expect(2).to.be.gte(2);
     * ```
     *
     * @public
     */
    gte(value: number): Assertion<number>;

    /**
     * Asserts that the value is greater than or equal to `value`.
     *
     * @remarks
     * _Type alias for {@link Assertion.greaterThanOrEqualTo | greaterThanOrEqualTo}._
     *
     * @param value - A number that the actual value should be greater than or equal to.
     *
     * @example
     * ```ts
     * expect(5).to.be.at.least(4);
     * expect(2).to.be.at.least(2);
     * ```
     *
     * @public
     */
    least(value: number): Assertion<number>;

    /**
     * Asserts that the value is less than `value`.
     *
     * @param value - A number that the actual value should be less than.
     *
     * @example
     * ```ts
     * expect(5).to.be.lessThan(4);
     * ```
     *
     * @public
     */
    lessThan(value: number): Assertion<number>;

    /**
     * Asserts that the value is less than `value`.
     *
     * @remarks
     * _Type alias for {@link Assertion.lessThan | lessThan}._
     *
     * @param value - A number that the actual value should be less than.
     *
     * @example
     * ```ts
     * expect(5).to.be.lt(4);
     * ```
     *
     * @public
     */
    lt(value: number): Assertion<number>;

    /**
     * Asserts that the value is less than `value`.
     *
     * @remarks
     * _Type alias for {@link Assertion.lessThan | lessThan}._
     *
     * @param value - A number that the actual value should be less than.
     *
     * @example
     * ```ts
     * expect(5).to.be.below(4);
     * ```
     *
     * @public
     */
    below(value: number): Assertion<number>;

    /**
     * Asserts that the value is less than or equal to `value`.
     *
     * @param value - A number that the actual value should be less than or equal to.
     *
     * @example
     * ```ts
     * expect(4).to.be.lessThanOrEqualTo(5);
     * expect(2).to.be.lessThanOrEqualTo(2);
     * ```
     *
     * @public
     */
    lessThanOrEqualTo(value: number): Assertion<number>;

    /**
     * Asserts that the value is less than or equal to `value`.
     *
     * @remarks
     * _Type alias for {@link Assertion.lessThanOrEqualTo | lessThanOrEqualTo}._
     *
     * @param value - A number that the actual value should be less than or equal to.
     *
     * @example
     * ```ts
     * expect(4).to.be.lte(5);
     * expect(2).to.be.lte(2);
     * ```
     *
     * @public
     */
    lte(value: number): Assertion<number>;

    /**
     * Asserts that the value is less than or equal to `value`.
     *
     * @remarks
     * _Type alias for {@link Assertion.lessThanOrEqualTo | lessThanOrEqualTo}._
     *
     * @param value - A number that the actual value should be less than or equal to.
     *
     * @example
     * ```ts
     * expect(4).to.be.at.most(5);
     * expect(2).to.be.at.most(2);
     * ```
     *
     * @public
     */
    most(value: number): Assertion<number>;
  }
}

extendMethods({
  greaterThan: greaterThan,
  gt: greaterThan,
  above: greaterThan,

  greaterThanOrEqualTo: greaterThanOrEqualTo,
  gte: greaterThanOrEqualTo,
  least: greaterThanOrEqualTo,

  lessThan: lessThan,
  lt: lessThan,
  below: lessThan,

  lessThanOrEqualTo: lessThanOrEqualTo,
  lte: lessThanOrEqualTo,
  most: lessThanOrEqualTo,
});
