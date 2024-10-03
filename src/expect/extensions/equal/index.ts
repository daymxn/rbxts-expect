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
  `Expected ${place.name} to ${place.not} strictly equal ${place.expected.value} (${place.expected.type})`
)
  .name(`${place.actual.value} (${place.actual.type})`)
  .nestedMetadata({
    [place.path]: `${place.actual.value} (${place.actual.type})`,
  });

const equal: CustomMethodImpl = (_, actual, expected: defined) => {
  const message = baseMessage.use().expectedValue(expected);

  if (actual === undefined && expected !== undefined) {
    return message
      .name("the value")
      .trailingFailureSuffix(", but it was undefined")
      .fail();
  }

  return actual === expected ? message.pass() : message.fail();
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Asserts that the value is _shallow_ equal to the `expectedValue`.
     *
     * @remarks
     * A value is shallow equal if they pass according to `===`.
     *
     * If you need to deeply check if values are equal, use {@link Assertion.deepEqual | deepEqual}.
     *
     * @example
     * ```ts
     * expect(5).to.equal(5);
     * expect("daymon").to.not.equal("bryan");
     * ```
     *
     * @public
     */
    equal<R = T>(expectedValue: R): Assertion<R>;

    /**
     * Asserts that the value is _shallow_ equal to the `expectedValue`.
     *
     * @remarks
     * _Type alias for {@link Assertion.equal | equal}._
     *
     * @public
     */
    equals<R = T>(expectedValue: R): Assertion<R>;

    /**
     * Asserts that the value is _shallow_ equal to the `expectedValue`.
     *
     * @remarks
     * _Type alias for {@link Assertion.equal | equal}._
     *
     * @public
     */
    eq<R = T>(expectedValue: R): Assertion<R>;
  }
}

extendMethods({
  eq: equal,
  equal: equal,
  equals: equal,
});
