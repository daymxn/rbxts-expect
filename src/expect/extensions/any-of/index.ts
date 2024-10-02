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
  `Expected ${place.name} to ${place.not} be any of ${place.expected.value}`
)
  .name(`${place.actual.value} (${place.actual.type})`)
  .nestedMetadata({ Value: place.actual.value });

const anyOf: CustomMethodImpl<defined> = (
  source,
  actual,
  values: defined[]
) => {
  const message = baseMessage.use().expectedValue(values);

  if (source.enum_type) {
    const value = source.enum_type[actual as number];
    const mappedValues = values.map((it) => source.enum_type![it as number]);

    message
      .actualValue(value)
      .actualType(`enum/${typeOf(actual)}`)
      .expectedValue(mappedValues);

    return mappedValues.includes(value) ? message.pass() : message.fail();
  } else {
    return values.includes(actual) ? message.pass() : message.fail();
  }
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Asserts that the value is _shallow_ equal to any of the provided `values`.
     *
     * @remarks
     * When used after an `enum` call, the output message will use
     * the enum key as the value.
     *
     * @param values - An array of values to check for
     *
     * @example Basic Usage:
     * ```ts
     * expect(1).to.be.anyOf([1,2,3]);
     * expect(0).to.not.be.anyOf([1,2,3]);
     * ```
     *
     * @example Enum Usage:
     * ```ts
     * enum Sport {
     *   Basketball,
     *   Football,
     *   Soccer
     * }
     *
     * expect(Sport.Basketball).to.be.the.enum(Sport).and.to.be.anyOf([Football, Soccer]);
     * // Expected 'Basketball' (enum/number) to be any of ["Football", "Soccer"]
     * ```
     *
     * @see {@link Assertion.oneOf | oneOf}
     *
     * @public
     */
    anyOf<R = T>(values: R[]): Assertion<R>;

    /**
     * Asserts that the value is _shallow_ equal to one of the provided `values`.
     *
     * @remarks
     * _Type alias for {@link Assertion.anyOf | anyOf}._
     *
     * @param values - An array of values to check for
     *
     * @public
     */
    oneOf<R = T>(values: R[]): Assertion<R>;
  }
}

extendMethods({
  anyOf: anyOf,
  oneOf: anyOf,
});
