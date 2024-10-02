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

import type { EnumValue, LuaEnum } from "@rbxts/expect";
import Object from "@rbxts/object-utils";
import { CustomMethodImpl, extendMethods } from "@src/expect/extend";
import { ExpectMessageBuilder } from "@src/message";
import { place } from "@src/message/placeholders";

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
  if (value !== undefined) {
    return validateIsEnumValue(actual, enumType, value).inspect(() => {
      source.enum_type = enumType;
    });
  } else {
    return validateIsEnumType(actual, enumType).inspect(() => {
      source.enum_type = enumType;
    });
  }
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Helper property for getting the mappings for a value that has passed
     * an {@link Assertion.enum | enum} check.
     *
     * @remarks
     * Is set by {@link Assertion.enum | enum} passing.
     *
     * Can be used in other expect methods to map the "actual"
     * value to its enum representation; typically for more
     * descriptive errors.
     *
     * @public
     */
    enum_type?: Record<number, string>;

    /**
     * Asserts that the value is an enum of type `R`.
     *
     * @remarks
     * This is _not_ for ROBLOX specific enums, but for _user_ defined enums.
     *
     * @param enumType - A TS defined `enum` or an equivalent record in lua.
     *
     * @example
     * ```ts
     * enum Sport {
     *   Basketball,
     *   Football,
     *   Soccer
     * }
     *
     * expect(Sport.Basketball).to.be.the.enum(Sport);
     * expect("Basketball").to.be.the.enum(Sport);
     * expect(0).to.be.the.enum(Sport);
     * ```
     *
     * @public
     */
    enum<R>(enumType: R & Record<number, string>): Assertion<EnumValue<R>>;

    /**
     * Asserts that the value is an enum of type `R`, and equal to the `value`.
     *
     * @remarks
     * This is _not_ for ROBLOX specific enums, but for _user_ defined enums.
     *
     * The reason you would use this over {@link Assertion.equal | equal}, is that
     * `enum` not only throws more descriptive errors about enums, but it also attaches
     * the {@link Assertion.enum_type | enum_type} property for chained methods
     * to provide their own more descriptive errors about enums.
     *
     * @param enumType - A TS defined `enum` or an equivalent record in lua.
     * @param value - The expected value of the defined enum type.
     *
     * @example
     * ```ts
     * enum Sport {
     *   Basketball,
     *   Football,
     *   Soccer
     * }
     *
     * expect(Sport.Basketball).to.be.the.enum(Sport, Sport.Basketball);
     * expect("Basketball").to.be.the.enum(Sport, Sport.Basketball);
     * expect(0).to.be.the.enum(Sport, Sport.Basketball);
     * ```
     *
     * @public
     */
    enum<R>(
      enumType: R & Record<number, string>,
      value: R[keyof R]
    ): Assertion<EnumValue<R>>;

    /**
     * Asserts that the value is an enum of type `R`, and equal to the `value`.
     *
     * @remarks
     * This is _not_ for ROBLOX specific enums, but for _user_ defined enums.
     *
     * The reason you would use this over {@link Assertion.equal | equal}, is that
     * `enum` not only throws more descriptive errors about enums, but it also attaches
     * the {@link Assertion.enum_type | enum_type} property for chained methods
     * to provide their own more descriptive errors about enums.
     *
     * @param enumType - A TS defined `enum` or an equivalent record in lua.
     * @param value - The expected value of the defined enum type, as a key string.
     *
     * @example
     * ```ts
     * enum Sport {
     *   Basketball,
     *   Football,
     *   Soccer
     * }
     *
     * expect(Sport.Basketball).to.be.the.enum(Sport, "Basketball");
     * expect("Basketball").to.be.the.enum(Sport, "Basketball");
     * expect(0).to.be.the.enum(Sport, "Basketball");
     * ```
     *
     * @public
     */
    enum<R>(
      enumType: R & Record<number, string>,
      value: keyof R
    ): Assertion<EnumValue<R>>;
  }
}

extendMethods({
  enum: beEnum,
});
