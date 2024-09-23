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

import { includes } from "@rbxts/string-utils";
import { CustomMethodImpl, extendMethods } from "@src/expect/extend";
import { ExpectMessageBuilder } from "@src/message";
import { place } from "@src/message/placeholders";
import { matches } from "@src/util/string";

const baseMessage = new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} throw`
);

const throws: CustomMethodImpl<Callback> = (
  source,
  actual,
  substring?: string
) => {
  const message = baseMessage.use();

  const functionName = debug.info(actual, "n")[0] ?? "";
  message.name(functionName !== "" ? functionName : "the function");

  if (substring !== undefined) {
    message.appendPrefix(` with the substring "${substring}"`);
  }

  try {
    actual();

    return message.suffix(", but it didn't throw at all").fail();
  } catch (e) {
    const err = e as string;

    if (substring !== undefined) {
      return includes(err, substring)
        ? message.metadata({ ErrorMessage: err }).pass()
        : message.suffix(`, but it threw a message without it:\n${err}`).fail();
    } else {
      return message
        .negationSuffix(`, but it did with the message:\n${err}`)
        .pass();
    }
  }
};

const throwsMatch: CustomMethodImpl<Callback> = (
  _,
  actual,
  pattern: string
) => {
  const message = baseMessage.use(` with a message that matched /${pattern}/`);

  const functionName = debug.info(actual, "n")[0] ?? "";
  message.name(functionName !== "" ? functionName : "the function");

  try {
    actual();

    return message.suffix(", but it didn't throw at all.").fail();
  } catch (e) {
    const err = e as string;

    return matches(err, pattern)
      ? message.metadata({ Error: err }).pass()
      : message.suffix(`, but it threw a message without it: "${err}"`).fail();
  }
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Asserts that the function throws an exception.
     *
     * @example
     * ```ts
     * expect(buyPet).to.throw();
     * ```
     *
     * @public
     */
    throw(): Assertion<T>;

    /**
     * Asserts that the function throws an exception that
     * contains the string `substring`.
     *
     * @remarks
     * For pattern matching, use {@link Assertion.throwMatch | throwMatch} instead.
     *
     * @example
     * ```ts
     * expect(buyPet).to.throw("Failed to buy pet");
     * ```
     *
     * @public
     */
    throw(substring: string): Assertion<T>;

    /**
     * Asserts that the function throws an exception.
     *
     * @remarks
     * _Type alias for the `throw` version of this._
     *
     * @example
     * ```ts
     * expect(buyPet).to.be.a.function().that.throws();
     * ```
     *
     * @public
     */
    throws(): Assertion<T>;

    /**
     * Asserts that the function throws an exception that
     * contains the string `substring`.
     *
     * @remarks
     * For pattern matching, use {@link Assertion.throwsMatch | throwsMatch} instead.
     *
     * _Type alias for the `throw` version of this._
     *
     * @example
     * ```ts
     * expect(buyPet).to.be.a.function().that.throws("Not enough money");
     * ```
     *
     * @public
     */
    throws(substring: string): Assertion<T>;

    /**
     * Asserts that the function throws an exception that
     * matches the lua pattern `pattern`.
     *
     * @remarks
     * For string literals or substring matching,
     * use {@link Assertion.throws | throws} instead.
     *
     * _Type alias for the `throwMatch` version of this._
     *
     * @example
     * ```ts
     * expect(buyPet).to.be.a.function().that.throwsMatch("^Error:.+Money");
     * ```
     *
     * @public
     */
    throwsMatch(pattern: string): Assertion<T>;

    /**
     * Asserts that the function throws an exception that
     * matches the lua pattern `pattern`.
     *
     * @remarks
     * For string literals or substring matching,
     * use {@link Assertion.throw | throw} instead.
     *
     * @example
     * ```ts
     * expect(buyPet).to.throwMatch("^Error:.+Money");
     * ```
     *
     * @public
     */
    throwMatch(pattern: string): Assertion<T>;
  }
}

extendMethods({
  throws: throws,
  throw: throws,

  throwMatch: throwsMatch,
  throwsMatch: throwsMatch,
});
