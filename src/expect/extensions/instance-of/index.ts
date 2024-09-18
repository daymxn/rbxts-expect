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
    instanceOf<I>(checker: TypeChecker<T>): Assertion<I>;
    instanceOf<I extends keyof CheckableTypes>(name: I): Assertion<I>;
    instanceOf<I>(tChecker: t.check<I>): Assertion<I>;

    typeOf<I>(checker: TypeChecker<T>): Assertion<I>;
    typeOf<I extends keyof CheckableTypes>(name: I): Assertion<I>;
    typeOf<I>(tChecker: t.check<I>): Assertion<I>;

    number(): Assertion<number>;
    string(): Assertion<string>;
    boolean(): Assertion<boolean>;
    table(): Assertion<object>;
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
});
