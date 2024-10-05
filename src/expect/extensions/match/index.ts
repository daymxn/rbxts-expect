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

import { deepEqual, FailureType } from "@rbxts/deep-equal";
import { CustomMethodImpl, extendMethods } from "@src/expect/extend";
import { ExpectMessageBuilder } from "@src/message";
import { place } from "@src/message/placeholders";
import { isProxy } from "@src/util/proxy";

const baseMessage = new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} match ${place.expected.value}`
);

const match: CustomMethodImpl = (_, actual, expected: object) => {
  const message = baseMessage.use().expectedValue(expected);

  if (isProxy(expected)) {
    warn(
      "Using proxies on the right side of assertions is undefined behavior. For further context, see http://rbxts-expect.daymxn.com/docs/usage-guide#proxies"
    );
  }

  const result = deepEqual(actual, expected, { checkRightMissing: false });

  if (!result) return message.pass();

  switch (result.failType) {
    case FailureType.DIFFERENT_REFERENCE: {
      if (result.path === "") {
        return message
          .suffix(
            `, but they point to different values of reference type '${place.actual.type}'`
          )
          .metadata({
            Actual: place.actual.value,
            Expected: place.expected.value,
          })
          .fail();
      } else {
        return message
          .suffix(
            `, but '${result.path}' points to a different value of reference type '${result.leftType}'`
          )
          .metadata({
            Actual: message.encode(result.leftValue),
            Expected: message.encode(result.rightValue),
          })
          .fail();
      }
    }
    case FailureType.DIFFERENT_TYPES: {
      if (result.path === "") {
        return message
          .suffix(`, but they have different types`)
          .metadata({
            Actual: `${place.actual.value} (${place.actual.type})`,
            Expected: `${place.expected.value} (${place.expected.type})`,
          })
          .fail();
      } else {
        return message
          .suffix(`, but '${result.path}' has a different type`)
          .metadata({
            Actual: `${message.encode(result.leftValue)} (${result.leftType})`,
            Expected: `${message.encode(result.rightValue)} (${result.rightType})`,
          })
          .fail();
      }
    }
    case FailureType.DIFFERENT_VALUES: {
      if (result.path === "") {
        return message
          .suffix(`, but they have different values`)
          .metadata({
            Actual: `${place.actual.value} (${place.actual.type})`,
            Expected: `${place.expected.value} (${place.expected.type})`,
          })
          .fail();
      } else {
        return message
          .suffix(`, but '${result.path}' has a different value`)
          .metadata({
            Actual: `${message.encode(result.leftValue)} (${result.leftType})`,
            Expected: `${message.encode(result.rightValue)} (${result.rightType})`,
          })
          .fail();
      }
    }
    case FailureType.MISSING_ARRAY_VALUE: {
      if (result.path === "") {
        if (!result.leftMissing.isEmpty()) {
          return message
            .suffix(`, but there were elements missing`)
            .metadata({
              Actual: `${place.actual.value}`,
              Expected: `${place.expected.value}`,
              Missing: message.encode(result.leftMissing),
            })
            .fail();
        } else {
          return message
            .suffix(`, but there were extra elements`)
            .metadata({
              Actual: `${place.actual.value}`,
              Expected: `${place.expected.value}`,
              [`Extra Elements`]: message.encode(result.rightMissing),
            })
            .fail();
        }
      } else {
        if (!result.leftMissing.isEmpty()) {
          return message
            .suffix(`, but '${result.path}' was missing some elements`)
            .metadata({
              Actual: message.encode(result.leftValue),
              Expected: message.encode(result.rightValue),
              Missing: message.encode(result.leftMissing),
            })
            .fail();
        } else {
          return message
            .suffix(`, but '${result.path}' had extra elements`)
            .metadata({
              Actual: message.encode(result.leftValue),
              Expected: message.encode(result.rightValue),
              [`Extra Elements`]: message.encode(result.rightMissing),
            })
            .fail();
        }
      }
    }
    case FailureType.MISSING: {
      if (result.leftValue === undefined) {
        return message
          .suffix(`, but '${result.path}' was missing`)
          .metadata({
            Expected: `${message.encode(result.rightValue)} (${result.rightType})`,
          })
          .fail();
      } else {
        return message
          .suffix(`, but it had the extra key '${result.path}'`)
          .metadata({
            [result.path]: `${message.encode(result.leftValue)} (${result.leftType})`,
          })
          .fail();
      }
    }
  }
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Asserts that the actual value has the same properties and values
     * as the `expected`.
     *
     * @remarks
     * Very similar to {@link Assertion.deepEqual | deepEqual}, but this only
     * applies one way; it doesn't fail if there are extra keys.
     *
     * Can be used to only check a collection of certain keys and their respective
     * values.
     *
     * @example
     * ```ts
     * expect({
     *   name: "daymon",
     *   age: 24
     *   children: [{
     *     name: "michael",
     *     age: 4
     *   }]
     * }).to.match({ age: 24 });
     * ```
     *
     * @see {@link Assertion.matches | matches}
     *
     * @public
     */
    match<R extends object>(expected: R): Assertion<R & T>;

    /**
     * Asserts that the actual value has the same properties and values
     * as the `expected`.
     *
     * @remarks
     * _Type alias for {@link Assertion.match | match}._
     *
     * @example
     * ```ts
     * expect({
     *   name: "daymon",
     *   age: 24
     *   children: [{
     *     name: "michael",
     *     age: 4
     *   }]
     * }).to.be.an.object().that.matches({ age: 24 });
     * ```
     *
     * @public
     */
    matches<R extends object>(expected: R): Assertion<R & T>;
  }
}

extendMethods({
  match: match,
  matches: match,
});
