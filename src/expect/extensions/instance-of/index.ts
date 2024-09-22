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

import { Assertion } from "@rbxts/expect";
import { t } from "@rbxts/t";
import { CustomMethodImpl, extendMethods } from "@src/expect/extend";
import { ExpectMessageBuilder } from "@src/message";
import { place } from "@src/message/placeholders";

const baseMessage = new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} be of `
).nestedMetadata({
  [place.path]: place.actual.value,
});

function validateTypeByCallback(actual: unknown, callback: Callback) {
  const message = baseMessage
    .use("a certain (user-defined) type")
    .failureSuffix(`, but it was not`);

  try {
    const result: unknown = callback(actual);
    if (typeIs(result, "string")) {
      return message.metadata({ Reason: result }).fail();
    }
    if (result === false) return message.fail();

    return message.pass();
  } catch (e) {
    return message.metadata({ Reason: e }).fail();
  }
}

function validateTypeByCheckableType(
  actual: unknown,
  typeName: keyof CheckableTypes
) {
  const message = baseMessage
    .use(`type '${typeName}'`)
    .failureSuffix(`, but it was a '${place.actual.type}'`);

  return typeName !== typeOf(actual) ? message.fail() : message.pass();
}

const instanceOf: CustomMethodImpl<unknown> = (
  _,
  actual,
  targetType: keyof CheckableTypes | Callback
) => {
  if (typeIs(targetType, "function")) {
    return validateTypeByCallback(actual, targetType);
  } else {
    return validateTypeByCheckableType(actual, targetType);
  }
};

const certainType =
  (name: keyof CheckableTypes) =>
  (source: Assertion<unknown>, actual: unknown) =>
    instanceOf(source, actual, name as never);

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Asserts that the value is an instance of type `typeName`.
     *
     * @remarks
     * The type is checked via
     * {@link https://github.com/roblox-ts/compiler-types/blob/a13fdb1171895c7ed1a7f091d18031534e988886/types/callMacros.d.ts#L11 | typeOf}.
     *
     * @example
     * ```ts
     * expect(1).to.be.an.instanceOf("number");
     * expect(new Vector3()).to.be.an.instanceOf("Vector3");
     * ```
     *
     * @public
     */
    instanceOf<I extends keyof CheckableTypes>(name: I): Assertion<I>;

    /**
     * Asserts that the value is an instance of `I`, according to
     * a custom callback {@link TypeCheckCallback}.
     *
     * @example
     * ```ts
     * const isNumber: TypeCheckCallback = (value) => {
     *   return typeOf(value) === "number";
     * }
     *
     * expect(1).to.be.an.instanceOf(isNumber);
     * ```
     *
     * @public
     */
    instanceOf<I>(checker: TypeCheckCallback<T>): Assertion<I>;

    /**
     * Asserts that the value is an instance of `I`, according to
     * a provided {@link https://github.com/osyrisrblx/t | t check}.
     *
     * @example
     * ```ts
     * expect(1).to.be.an.instanceOf(t.number);
     * ```
     *
     * @public
     */
    instanceOf<I>(tChecker: t.check<I>): Assertion<I>;

    /**
     * Asserts that the value is of type `typeName`.
     *
     * @remarks
     * The type is checked via
     * {@link https://github.com/roblox-ts/compiler-types/blob/a13fdb1171895c7ed1a7f091d18031534e988886/types/callMacros.d.ts#L11 | typeOf}.
     *
     * _Type alias for the `instanceOf` version of this._
     *
     * @example
     * ```ts
     * expect(1).to.be.an.instanceOf("number");
     * expect(new Vector3()).to.be.an.instanceOf("Vector3");
     * ```
     *
     * @public
     */
    typeOf<I extends keyof CheckableTypes>(name: I): Assertion<I>;

    /**
     * Asserts that the value is of type `I`, according to
     * a custom callback {@link TypeCheckCallback}.
     *
     * @remarks
     * _Type alias for the `instanceOf` version of this._
     *
     * @example
     * ```ts
     * const isNumber: TypeCheckCallback = (value) => {
     *   return typeOf(value) === "number";
     * }
     *
     * expect(1).to.be.an.instanceOf(isNumber);
     * ```
     *
     * @public
     */
    typeOf<I>(checker: TypeCheckCallback<T>): Assertion<I>;

    /**
     * Asserts that the value is of type `I`, according to
     * a provided {@link https://github.com/osyrisrblx/t | t check}.
     *
     * @remarks
     * _Type alias for the `instanceOf` version of this._
     *
     * @example
     * ```ts
     * expect(1).to.be.an.instanceOf(t.number);
     * ```
     *
     * @public
     */
    typeOf<I>(tChecker: t.check<I>): Assertion<I>;

    /**
     * Asserts that the value is a {@link https://create.roblox.com/docs/luau/numbers | number}.
     *
     * @remarks
     * Just a wrapper around {@link Assertion.instanceOf | instanceOf}, but with the `number` type
     * provided automatically.
     *
     * @example
     * ```ts
     * expect(1).to.be.a.number();
     * ```
     *
     * @public
     */
    number(): Assertion<number>;

    /**
     * Asserts that the value is a {@link https://create.roblox.com/docs/luau/strings | string}.
     *
     * @remarks
     * Just a wrapper around {@link Assertion.instanceOf | instanceOf}, but with the `string` type
     * provided automatically.
     *
     * @example
     * ```ts
     * expect("daymon").to.be.a.string();
     * ```
     *
     * @public
     */
    string(): Assertion<string>;

    /**
     * Asserts that the value is a {@link https://create.roblox.com/docs/luau/booleans | boolean}.
     *
     * @remarks
     * Just a wrapper around {@link Assertion.instanceOf | instanceOf}, but with the `boolean` type
     * provided automatically.
     *
     * @example
     * ```ts
     * expect(true).to.be.a.boolean();
     * expect(false).to.be.a.boolean();
     * ```
     *
     * @public
     */
    boolean(): Assertion<boolean>;

    /**
     * Asserts that the value is a {@link https://create.roblox.com/docs/luau/tables | table}.
     *
     * @remarks
     * Just a wrapper around {@link Assertion.instanceOf | instanceOf}, but with the `table` type
     * provided automatically.
     *
     * @example
     * ```ts
     * expect({ age: 5 }).to.be.a.table();
     * ```
     *
     * @public
     */
    table(): Assertion<object>;

    /**
     * Asserts that the value is a {@link https://create.roblox.com/docs/luau/tables | table}.
     *
     * @remarks
     * Just a wrapper around {@link Assertion.instanceOf | instanceOf}, but with the `table` type
     * provided automatically.
     *
     * _Type alias for {@link Assertion.table | table}._
     *
     * @example
     * ```ts
     * expect({ age: 5 }).to.be.an.object();
     * ```
     *
     * @public
     */
    object(): Assertion<object>;
  }
}

extendMethods({
  instanceOf: instanceOf,
  typeOf: instanceOf,

  number: certainType("number"),
  string: certainType("string"),
  boolean: certainType("boolean"),
  table: certainType("table"),
  object: certainType("table"),
  function: certainType("function"),
});
