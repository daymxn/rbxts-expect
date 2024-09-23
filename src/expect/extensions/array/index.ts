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

/* eslint-disable roblox-ts/no-array-pairs */

import { TypeCheckCallback } from "@rbxts/expect";
import Object from "@rbxts/object-utils";
import { t } from "@rbxts/t";
import { CustomMethodImpl, extendMethods } from "@src/expect/extend";
import { ExpectMessageBuilder } from "@src/message";
import { place } from "@src/message/placeholders";

const baseMessage = new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} be an array`
).nestedMetadata({ [place.path]: place.actual.value });

function validateArrayTypeByCallback(
  actual: defined[],
  targetType: TypeCheckCallback<defined>
) {
  const message = baseMessage
    .use(" of a certain (user-defined) type")
    .failureSuffix(", but there was an element that was not");

  for (const [index, value] of ipairs(actual)) {
    message.failureMetadata({ Index: index, Value: value });

    try {
      const result = targetType(value);

      if (typeIs(result, "string")) {
        return message.failWithReason(result);
      }

      if (result === false) return message.fail();
    } catch (e) {
      return message.failWithReason(`${e}`);
    }
  }

  return message.pass();
}

function validateArrayTypeByCheckableType(
  actual: defined[],
  targetType: keyof CheckableTypes
) {
  const message = baseMessage.use(` of type '${targetType}'`);

  for (const [index, value] of ipairs(actual)) {
    message.metadata({ Index: index, Value: value });

    if (targetType !== typeOf(value)) {
      return message
        .suffix(`, but there was an element that was a '${typeOf(value)}'`)
        .fail();
    }
  }

  return message.pass();
}

function validateArrayType(
  actual: defined[],
  targetType: TypeCheckCallback<defined> | keyof CheckableTypes
) {
  if (typeIs(targetType, "function")) {
    return validateArrayTypeByCallback(actual, targetType);
  } else {
    return validateArrayTypeByCheckableType(actual, targetType);
  }
}

const array: CustomMethodImpl<unknown> = (source, actual, targetType) => {
  const message = baseMessage
    .use()
    .trailingFailurePrefix(`, but it ${place.reason}`);

  if (actual === undefined) return message.failWithReason("was undefined");

  if (!typeIs(actual, "table"))
    return message.failWithReason(`was a '${typeOf(actual)}'`);

  const entries = Object.entries(actual);

  // TODO(): is this reliable and fine?
  const arraySize = entries.size();

  for (const [key, value] of entries) {
    message.failureMetadata({ [`Value of [${key}]`]: value });

    if (!typeIs(key, "number"))
      return message.failWithReason(
        `had a non number key '${key}' (${typeOf(key)})`
      );

    if (key < 1)
      return message.failWithReason(`had an out of bounds key '${key}'`);

    if (key > arraySize)
      return message.failWithReason(
        `had an out of bounds key '${key}'. Are there holes in the array?`
      );
  }

  if (targetType !== undefined) {
    return validateArrayType(actual as defined[], targetType).inspect(() => {
      source.is_array = true;
    });
  } else {
    return message.pass().inspect(() => {
      source.is_array = true;
    });
  }
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Helper property for checking if a value has already passed an
     * {@link Assertion.array | array} check.
     *
     * @remarks
     * Is set by {@link Assertion.array | array} passing.
     *
     * Can be used in other expect methods to skip checking if their
     * actual value is an array, or to toggle certain logic if it is.
     *
     * @public
     */
    is_array?: boolean;

    /**
     * Asserts that the value is an array.
     *
     * @remarks
     * An array is classified as a table of incrementing number keys that start at `1`,
     * and without any holes.
     *
     * {@label BASE}
     *
     * @example
     * ```ts
     * expect([1,2,3]).to.be.an.array();
     * expect({ name: "daymon" }).to.not.be.an.array();
     * ```
     *
     * @public
     */
    array(): Assertion<T extends unknown[] ? T : T[]>;

    /**
     * Asserts that the value is an array of type `typeName`.
     *
     * @remarks
     * Each element in the array has its type checked via
     * {@link https://github.com/roblox-ts/compiler-types/blob/a13fdb1171895c7ed1a7f091d18031534e988886/types/callMacros.d.ts#L11 | typeOf}.
     *
     * @example
     * ```ts
     * expect([1,2,3]).to.be.an.array("number");
     * expect([new Vector3()]).to.be.an.array("Vector3");
     * ```
     *
     * @public
     */
    array<I extends keyof CheckableTypes>(typeName: I): Assertion<I[]>;

    /**
     * Asserts that the value is an array of type `I`, according to
     * a custom callback {@link TypeCheckCallback}.
     *
     * @example
     * ```ts
     * const isNumber: TypeCheckCallback = (value) => {
     *   return typeOf(value) === "number";
     * }
     *
     * expect([1,2,3]).to.be.an.array(isNumber);
     * ```
     *
     * @public
     */
    array<I>(checker: TypeCheckCallback<I>): Assertion<I[]>;

    /**
     * Asserts that the value is an array of type `I`, according to
     * a provided {@link https://github.com/osyrisrblx/t | t check}.
     *
     * @example
     * ```ts
     * expect([1,2,3]).to.be.an.array(t.number);
     * ```
     *
     * @public
     */
    array<I>(tChecker: t.check<I>): Assertion<I[]>;

    /**
     * Asserts that the value is an array of type `typeName`.
     *
     * @remarks
     * Each element in the array has its type checked via
     * {@link https://github.com/roblox-ts/compiler-types/blob/a13fdb1171895c7ed1a7f091d18031534e988886/types/callMacros.d.ts#L11 | typeOf}.
     *
     * _Type alias for the `array` version of this_
     *
     * @example
     * ```ts
     * expect([1,2,3]).to.be.an.arrayOf("number");
     * expect([new Vector3()]).to.be.an.arrayOf("Vector3");
     * ```
     *
     * @public
     */
    arrayOf<I extends keyof CheckableTypes>(typeName: I): Assertion<I[]>;

    /**
     * Asserts that the value is an array of type `I`, according to
     * a custom callback {@link TypeCheckCallback}.
     *
     * @remarks
     * _Type alias for the `array` version of this._
     *
     * @example
     * ```ts
     * const isNumber: TypeCheckCallback = (value) => {
     *   return typeOf(value) === "number";
     * }
     *
     * expect([1,2,3]).to.be.an.arrayOf(isNumber);
     * ```
     *
     * @public
     */
    arrayOf<I>(checker: TypeCheckCallback<I>): Assertion<I[]>;

    /**
     * Asserts that the value is an array of type `I`, according to
     * a provided {@link https://github.com/osyrisrblx/t | t check}.
     *
     * @remarks
     * _Type alias for the `array` version of this._
     *
     * @example
     * ```ts
     * expect([1,2,3]).to.be.an.arrayOf(t.number);
     * ```
     *
     * @public
     */
    arrayOf<I>(tChecker: t.check<I>): Assertion<I[]>;
  }
}

extendMethods({
  array: array,
  arrayOf: array,
});
