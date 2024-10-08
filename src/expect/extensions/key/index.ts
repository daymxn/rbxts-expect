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

import { Filter } from "@rbxts/expect";
import { CustomMethodImpl, extendMethods } from "@src/expect/extend";
import { ExpectMessageBuilder } from "@src/message";
import { place } from "@src/message/placeholders";

const baseMessage = new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} have the key ${place.expected.value}`
)
  .trailingFailureSuffix(`, but it ${place.reason}`)
  .nestedMetadata({
    [place.path]: `${place.actual.value} (${place.actual.type})`,
  });

const hasKey: CustomMethodImpl = (_, actual, key: string) => {
  const message = baseMessage.use().expectedValue(key);

  if (actual === undefined) {
    return message.name("the value").failWithReason("was undefined");
  }

  if (!typeIs(actual, "table")) {
    return message
      .name(`${place.actual.value} (${place.actual.type})`)
      .failWithReason("wasn't a table");
  }

  if (key in actual) {
    return message
      .metadata({
        [`${key}`]: message.encode((actual as Record<string, unknown>)[key]),
      })
      .pass();
  }

  return message.failWithReason("was missing");
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Asserts that the table has the key `key`.
     *
     * @param key - Name of the key that the table should have.
     *
     * @returns This instance for chaining.
     *
     * @example
     * ```ts
     * expect({ name: "Daymon" }).to.have.the.key("name");
     * ```
     *
     * @see {@link Assertion.property | property}
     *
     * @public
     */
    key(key: string): this;

    /**
     * Asserts that the table has the property `property`.
     *
     * @remarks
     * _Type alias for {@link Assertion.key | key}._
     *
     * @param property - Name of the property that the table should have.
     *
     * @returns This instance for chaining.
     *
     * @example
     * ```ts
     * expect({ name: "Daymon" }).to.have.the.property("name");
     * ```
     *
     * @public
     */
    property(property: string): this;
  }
}

extendMethods({
  key: hasKey,
  property: hasKey,
});
