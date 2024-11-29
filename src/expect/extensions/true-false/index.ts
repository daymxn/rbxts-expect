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
import { isLuauTruthy } from "@src/util/roblox";

const baseMessage = new ExpectMessageBuilder(`Expected ${place.name} to ${place.not} be `)
  .trailingFailureSuffix(`, but it ${place.reason}`)
  .negationSuffix(", but it was")
  .nestedMetadata({
    [place.path]: place.actual.value,
  });

function validateIsBoolean(message: ExpectMessageBuilder, actual: unknown, expected: boolean) {
  if (actual === undefined) {
    return message.name("the value").failWithReason("was undefined");
  }

  if (!typeIs(actual, "boolean")) {
    return message.name(`${place.actual.value} (${place.actual.type})`).failWithReason("wasn't a boolean");
  }

  if (expected) {
    return actual ? message.pass() : message.trailingFailureSuffix().fail();
  } else {
    return actual ? message.trailingFailureSuffix().fail() : message.pass();
  }
}

const isTrue: CustomMethodImpl = (_, actual) => {
  const message = baseMessage.use(`'true'`);

  return validateIsBoolean(message, actual, true);
};

const isFalse: CustomMethodImpl = (_, actual) => {
  const message = baseMessage.use(`'false'`);

  return validateIsBoolean(message, actual, false);
};

const isTruthy: CustomMethodImpl = (_, actual) => {
  const message = baseMessage.use(`truthy`);

  if (actual === undefined) {
    return message.name("the value").failWithReason("was undefined");
  }

  return isLuauTruthy(actual) ? message.pass() : message.failWithReason("was not");
};

const isFalsy: CustomMethodImpl = (_, actual) => {
  const message = baseMessage.use(`falsy`);

  return isLuauTruthy(actual) ? message.failWithReason("was not") : message.pass();
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Asserts that the value is a boolean of `true`.
     *
     * @example
     * ```ts
     * expect(true).to.be.true();
     * ```
     *
     * @see {@link Assertion.false | false},
     * {@link Assertion.truthy | truthy}
     *
     * @public
     */
    true(): this;

    /**
     * Asserts that the value is a boolean of `false`.
     *
     * @example
     * ```ts
     * expect(false).to.be.false();
     * ```
     *
     * @see {@link Assertion.true | true},
     * {@link Assertion.falsy | falsy}
     *
     * @public
     */
    false(): this;

    /**
     * Asserts that the value is a "truthy" value, according to luau.
     *
     * @remarks
     * A truthy value is any value that isn't `false` or `nil`.
     *
     * You can read more about it on the
     * [luau docs](https://create.roblox.com/docs/luau/booleans#conditionals).
     *
     * @example
     * ```ts
     * expect(1).to.be.truthy();
     * expect(0).to.be.truthy();
     *
     * expect("day").to.be.truthy();
     * expect("").to.be.truthy();
     * ```
     *
     * @see {@link Assertion.falsy | falsy},
     * {@link Assertion.true | true}
     *
     * @public
     */
    truthy(): this;

    /**
     * Asserts that the value is a "falsy" value, according to luau.
     *
     * @remarks
     * A falsy value is a value of `false` or `nil`.
     *
     * You can read more about it on the
     * [luau docs](https://create.roblox.com/docs/luau/booleans#conditionals).
     *
     * @example
     * ```ts
     * expect(false).to.be.falsy();
     * expect(undefined).to.be.falsy();
     *
     * expect(0).to.not.be.falsy();
     * expect("").to.not.be.falsy();
     * ```
     *
     * @see {@link Assertion.truthy | truthy},
     * {@link Assertion.false | false}
     *
     * @public
     */
    falsy(): this;
  }
}

extendMethods({
  true: isTrue,
  false: isFalse,
  truthy: isTruthy,
  falsy: isFalsy,
});
