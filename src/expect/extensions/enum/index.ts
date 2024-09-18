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

import Object from "@rbxts/object-utils";
import { CustomMethodImpl, extendMethods } from "@src/expect/extend";
import { ExpectMessageBuilder } from "@src/message";
import { place } from "@src/message/placeholders";

type LuaEnum = Record<string | number, string>;

const baseMessage = new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} be `
)
  .name(`${place.actual.value} (${place.actual.type})`)
  .nestedMetadata({
    [place.path]: `${place.actual.value} (${place.actual.type})`,
  });

function validateIsEnumType(actual: keyof LuaEnum, enumType: LuaEnum) {
  const enumValues = Object.keys(enumType).sort().join(" | ");
  const enumValue = enumType[actual];

  const message = baseMessage.use(`a valid enum of '(${enumValues})'`);

  if (enumValue === undefined) return message.fail();

  return message
    .actualValue(enumValue)
    .actualType(`enum/${typeOf(actual)}`)
    .pass();
}

function validateIsEnumValue(
  actual: keyof LuaEnum,
  enumType: LuaEnum,
  value: keyof LuaEnum
) {
  const enumValue = enumType[actual];
  const expectedValue = enumType[value];

  const message = baseMessage.use(`the enum '${expectedValue}'`);

  if (enumValue !== undefined) {
    message.actualValue(enumValue).actualType(`enum/${typeOf(actual)}`);
  }

  return enumValue === expectedValue ? message.pass() : message.fail();
}

const beEnum: CustomMethodImpl<keyof LuaEnum> = (
  source,
  actual,
  enumType: LuaEnum,
  value?: keyof LuaEnum
) => {
  rawset(source, "_enumType", enumType);

  if (value !== undefined) {
    return validateIsEnumValue(actual, enumType, value);
  } else {
    return validateIsEnumType(actual, enumType);
  }
};

type EnumValue<E> = E[keyof E];

declare module "@rbxts/expect" {
  interface Assertion<T> {
    _enumType?: Record<number, string>;

    enum<R>(enumType: R & Record<number, string>): Assertion<EnumValue<R>>;
    enum<R>(enumType: R & Record<number, string>): Assertion<EnumValue<R>>;
    enum<R>(
      enumType: R & Record<number, string>,
      value: R[keyof R]
    ): Assertion<EnumValue<R>>;
    enum<R>(
      enumType: R & Record<number, string>,
      value: keyof R
    ): Assertion<EnumValue<R>>;
  }
}

extendMethods({
  enum: beEnum,
});
