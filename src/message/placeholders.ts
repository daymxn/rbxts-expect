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

import type { Assertion, expect, ExpectConfig } from "@src/expect";
import type { ExpectMessageBuilder, ExpectMessageBuilderOptions } from "@src/message";
import type { Proxy } from "@src/util";
import { escape } from "@src/util/string";

function placeholder(name: string): string {
  return escape(`{__rbxtsexpect_${name}}`);
}

/**
 * The "actual" variable in an {@link expect} statement.
 *
 * @remarks
 * This is the first variable passed into {@link expect} when starting
 * an assertion chain.
 *
 * We refer to it as the "actual" variable, as it's a contrast to
 * the {@link Placeholder.expected | expected} variable.
 *
 * _Note that you shouldn't use `actual` directly in your messages,
 * instead you should use one of the properties of this type._
 *
 * @example
 * Given the following assertion chain:
 * ```ts
 * expect(5).to.equal(6);
 * ```
 * The value `5` is the "actual" value/variable.
 *
 * It's whatever you pass to `expect` when calling it initially.
 *
 * @see {@link Placeholder.name | name},
 * {@link Placeholder.expected | expected},
 * {@link ExpectMessageBuilder.actual}
 *
 * @public
 */
export interface ActualPlaceholder {
  /**
   * The "actual" value in an {@link expect} statement, which
   * can optionally be {@link ExpectConfig.collapseLength | collapsed}.
   *
   * @remarks
   * This is the value of the {@link Placeholder.actual | actual}
   * variable.
   *
   * Keep in mind that this value respects the defined
   * {@link ExpectConfig.collapseLength | collapseLength}.
   *
   * If you _don't_ want it to respect the collapse length,
   * then use {@link ActualPlaceholder.fullValue | fullValue} instead.
   *
   * @example
   * Given the following assertion chain:
   * ```ts
   * expect(5).to.equal(6);
   * ```
   * The value `5` is the "actual" value.
   *
   * @see {@link Placeholder.name | name},
   * {@link ExpectedPlaceholder.value | expected.value},
   * {@link ExpectMessageBuilder.actualValue}
   */
  value: string;

  /**
   * The "actual" value in an {@link expect} statement, which
   * is _not_ {@link ExpectConfig.collapseLength | collapsed}.
   *
   * @remarks
   * This is the "full" value of the {@link Placeholder.actual | actual}
   * variable.
   *
   * It being full means that it does NOT respect the defined
   * {@link ExpectConfig.collapseLength | collapseLength}.
   *
   * If you _do_ want it to respect the collapse length,
   * then use {@link ActualPlaceholder.value | value} instead.
   *
   * By default, most messages already have the
   * {@link ExpectMessageBuilderOptions.attachFullOnCollapse | attachFullOnCollapse} setting
   * enabled, so you don't usually have to attach this yourself.
   *
   * @example
   * For example, lets say we were checking if an object had any keys:
   * ```ts
   * new ExpectMessageBuilder(
   *  `Expected ${place.actual.value} to NOT have any keys`
   * ).metadata({FullValue: place.actual.fullValue});
   * ```
   *
   * And the object was larger than our configured `collapseLength`, and ended up
   * collapsed:
   * ```logs
   * Expected '{...}' to NOT have any keys
   * FullValue: '{"name":"Daymon","age":24}'
   * ```
   *
   * This allows us to keep the main message short and easy to read, while still
   * retaining the full value for debugging.
   *
   * @see {@link Placeholder.name | name},
   * {@link ExpectedPlaceholder.fullValue | expected.fullValue}
   */
  fullValue: string;

  /**
   * A string representing the type of the {@link ActualPlaceholder.value | actual value}
   * in an {@link expect} statement.
   *
   * @remarks
   * By default, this value gets set automatically via the macro
   * {@link https://github.com/roblox-ts/compiler-types/blob/a13fdb1171895c7ed1a7f091d18031534e988886/types/callMacros.d.ts#L11 | typeOf}.
   *
   * But you can optionally override this for custom types via
   * {@link ExpectMessageBuilder.actualType}.
   *
   * @example
   * Let's say we were checking if a value was an array:
   * ```ts
   * new ExpectMessageBuilder(
   *  `Expected ${place.actual.value} (${place.actual.type}) to be an array`
   * );
   * ```
   *
   * We'd get output like:
   * ```logs
   * Expected '5' (number) to be an array
   * ```
   *
   * @see {@link Placeholder.actual | actual},
   * {@link ExpectedPlaceholder.type | expected.type},
   * {@link ExpectMessageBuilder.actualType}
   */
  type: string;
}

/**
 * The "expected" variable in an {@link expect} statement.
 *
 * @remarks
 * This is _usually_ the value passed into an assertion method,
 * but not all methods end up having an expected value.
 *
 * For example, the {@link Assertion.empty | empty} method
 * doesn't have anything it's comparing the
 * {@link Placeholder.actual | actual} value to, so it doesn't
 * have an "expected" value.
 *
 * We refer to it as the "expected" variable, as it's _usually_
 * what you're expecting the {@link Placeholder.actual | actual} variable
 * to be.
 *
 * _Note that you shouldn't use `expected` directly in your messages,
 * instead you should use one of the properties of this type._
 *
 * @example
 * Given the following assertion chain:
 * ```ts
 * expect(5).to.equal(6);
 * ```
 * The value `5` is the "actual" value/variable.
 *
 * It's whatever you pass to `expect` when calling it initially.
 *
 * @see  {@link Placeholder.actual | actual},
 * {@link ExpectMessageBuilder.expected}
 *
 * @public
 */
export interface ExpectedPlaceholder {
  /**
   * The "expected" value in an {@link expect} statement, which
   * can optionally be {@link ExpectConfig.collapseLength | collapsed}.
   *
   * @remarks
   * This is the value of the {@link Placeholder.expected | expected}
   * variable.
   *
   * Keep in mind that this value respects the defined
   * {@link ExpectConfig.collapseLength | collapseLength}.
   *
   * If you _don't_ want it to respect the collapse length,
   * then use {@link ExpectedPlaceholder.fullValue | fullValue} instead.
   *
   * @example
   * Given the following assertion chain:
   * ```ts
   * expect(5).to.equal(6);
   * ```
   * The value `6` is the "expected" value.
   *
   * @see {@link ActualPlaceholder.value | actual.value},
   * {@link ExpectMessageBuilder.expectedValue}
   */
  value: string;

  /**
   * The "expected" value in an {@link expect} statement, which
   * is _not_ {@link ExpectConfig.collapseLength | collapsed}.
   *
   * @remarks
   * This is the "full" value of the {@link Placeholder.expected | expected}
   * variable.
   *
   * It being full means that it does NOT respect the defined
   * {@link ExpectConfig.collapseLength | collapseLength}.
   *
   * If you _do_ want it to respect the collapse length,
   * then use {@link ExpectedPlaceholder.value | value} instead.
   *
   * By default, most messages already have the
   * {@link ExpectMessageBuilderOptions.attachFullOnCollapse | attachFullOnCollapse} setting
   * enabled, so you don't usually have to attach this yourself.
   *
   * @example
   * For example, lets say we were checking if an object matched
   * another object:
   * ```ts
   * new ExpectMessageBuilder(
   *  `Expected ${place.actual.value} to be equal to
   * ${place.expected.value}
   * `
   * ).metadata({
   *   ["Expected (full)"]: place.expected.fullValue,
   *   ["Actual (full)"]: place.actual.fullValue
   * });
   * ```
   *
   * And the object was larger than our configured `collapseLength`, and ended up
   * collapsed:
   * ```logs
   * Expected '{...}' to be equal to '{...}'
   * Expected (full): '{"name":"Bryan","age":20}'
   * Actual (full): '{"name":"Daymon","age":24}'
   * ```
   *
   * This allows us to keep the main message short and easy to read, while still
   * retaining the full value for debugging.
   *
   * @see {@link ActualPlaceholder.fullValue | actual.fullValue}
   */
  fullValue: string;

  /**
   * A string representing the type of the {@link ExpectedPlaceholder.value | expected value}
   * in an {@link expect} statement.
   *
   * @remarks
   * By default, this value gets set automatically via the macro
   * {@link https://github.com/roblox-ts/compiler-types/blob/a13fdb1171895c7ed1a7f091d18031534e988886/types/callMacros.d.ts#L11 | typeOf}.
   *
   * But you can optionally override this for custom types via
   * {@link ExpectMessageBuilder.expectedType}.
   *
   * @example
   * Let's say we were checking if two values were equal:
   * ```ts
   * new ExpectMessageBuilder(
   *  `Expected ${place.actual.value} (${place.actual.type}) to be
   * equal to ${place.expected.value} (${place.expected.type})`
   * );
   * ```
   *
   * We'd get output like:
   * ```logs
   * Expected '5' (number) to be equal to "5" (string)
   * ```
   *
   * @see {@link Placeholder.actual | actual},
   * {@link ExpectedPlaceholder.type | expected.type},
   * {@link ExpectMessageBuilder.actualType}
   */
  type: string;
}

/**
 * Utility interface for specifying dynamic variables in {@link ExpectMessageBuilder | expect error messages}.
 *
 * @remarks
 * At {@link ExpectMessageBuilder.build | build time}, the variables placed via this interface will be populated
 * with their respective values.
 *
 * This allows you to define a static string, while still specifying the location of certain variables—without
 * needing to know their values.
 *
 * @example
 * ```ts
 * new ExpectMessageBuilder(
 *   `Expected ${place.name} to ${place.not} equal ${place.expected.value}`
 * );
 * ```
 *
 * @public
 */
export interface Placeholder {
  /**
   * {@inheritDoc ActualPlaceholder}
   */
  actual: ActualPlaceholder;

  /**
   * {@inheritDoc ExpectedPlaceholder}
   */
  expected: ExpectedPlaceholder;

  /**
   * A placeholder for the word `"NOT"`, that will only be populated
   * when the assertion is {@link Assertion.not | negated}.
   *
   * @remarks
   * Can be of use when you're writing an {@link ExpectMessageBuilder | expect message},
   * and the only difference between your normal message and your negated message
   * is the word "NOT".
   *
   * @example
   * Let's say we were checking if an array was empty:
   * ```ts
   * new ExpectMessageBuilder(
   *  `Expected ${place.name} to be empty`,
   *  `Expected ${place.name} to NOT be empty`
   * );
   * ```
   *
   * Notice how the only difference between the normal message and the negated one
   * is the word "NOT"? We can use the `not` placeholder to reduce this:
   * ```ts
   * new ExpectMessageBuilder(
   *  `Expected ${place.name} to ${place.not} be empty`
   * );
   * ```
   *
   * And as such, the word "NOT" will be added, but only if the check is negated.
   * ```logs
   * Expected [1,2,3] to be empty
   * Expected [] to NOT be empty
   * ```
   */
  not: string;

  /**
   * A utility placeholder for describing why the check failed.
   *
   * @remarks
   * A lot of times, your check might me making multiple assertions, or
   * have different errors depending on the context.
   *
   * Using a `reason`, you can specify a place in your message for this
   * data to be provided.
   *
   * You can then "provide" a reason via {@link ExpectMessageBuilder.reason}.
   *
   * _Note that if you "provide" a reason, but your string doesn't
   * have a `reason` placeholder in it- the reason will be attached
   * right before the metadata as `Reason: message`_
   *
   * @example
   * Lets say we were checking if a value was an array.
   * ```ts
   * new ExpectMessageBuilder(
   *   `Expected ${place.name} to be an array`
   * ).failureSuffix(`, but ${place.reason}`);
   * ```
   *
   * By using a `reason`, we can provide a bunch of different
   * reasonings for why the value isn't an array:
   * ```logs
   * Expected '5' to be an array, but it was a number
   * Expected '{...}' to be an array, but it had a non number key
   * Expected 'nil' to be an array, but it was undefined
   * ```
   *
   * @example
   * If you populate a reason at runtime, but don't have a `reason`
   * in your message, it will still propgate to the message.
   * ```ts
   * new ExpectMessageBuilder(
   *   `Expected ${place.name} to be an array`
   * );
   * ```
   *
   * Example error:
   * ```ts
   * Expected '5' to be an array
   * Reason: it was a number
   * ```
   *
   * This way, you can add a `reason` whenever you need it, without needing
   * to find a predefined spot for it in your message.
   *
   * @see {@link ExpectMessageBuilder.reason},
   * {@link ExpectMessageBuilder.failWithReason}
   */
  reason: string;

  /**
   * A utility placeholder the path on nested variables.
   *
   * @remarks
   * When working with tables, you might want to retain the path
   * to the property that failed.
   *
   * Using a `path`, you can specify a place in your message for this
   * data to be provided.
   *
   * You can then "provide" a path via {@link ExpectMessageBuilder.path}.
   *
   * Alternatively, you can use a {@link Proxy} to have this
   * automatically provided.
   *
   * @example
   * Let's say we were checking if a value was an array:
   * ```ts
   * new ExpectMessageBuilder(
   *   `${place.path} - Expected ${place.actual.value} to be an array`
   * );
   * ```
   *
   * We could then output messages like so:
   * ```logs
   * parent.cars - Expected '2' to be an array
   * ```
   *
   * @see {@link Placeholder.name | name},
   * {@link ExpectMessageBuilder.path},
   * {@link Proxy}
   */
  path: string;

  /**
   * A utility placeholder for either the {@link Placeholder.path | path},
   * or the {@link Placeholder.actual | actual value}.
   *
   * Messages can configure their own names as well.
   *
   * @remarks
   * A common theme in messages in to display the path when
   * working with tables, and display the actual value when
   * working with non tables.
   *
   * Using a `name`, you can specify to use the
   * {@link Placeholder.path | path} whenever it's available,
   * but fallback to the {@link ActualPlaceholder.value | actual.value}.
   *
   * You can also provide your own name to fallback for instead of the
   * actual value. You can do this via {@link ExpectMessageBuilder.name}.
   *
   * @example
   * Let's say we were checking if a value was an array:
   * ```ts
   * new ExpectMessageBuilder(
   *   `Expected ${place.name} to be an array`
   * );
   * ```
   *
   * When working with tables, we'd get the following output:
   * ```logs
   * Expected parent.cars to be an array
   * ```
   * But when working with non tables, we'd get:
   * ```logs
   * Expected '5' to be an array
   * ```
   *
   * It's also a common practice to use `nestedMetadata` to provide
   * the "actual" value whenever the path replaces it.
   *
   * ```ts
   * new ExpectMessageBuilder(
   *   `Expected ${place.name} to be an array`
   * ).nestedMetadata({ [place.path]: place.actual.fullValue });
   * ```
   *
   * When working with tables, we'd get the following output:
   * ```logs
   * Expected parent.cars to be an array
   * parent.cars: '5'
   * ```
   * But when working with non tables, that additional data wouldn't be there:
   * ```logs
   * Expected '5' to be an array
   * ```
   *
   * @see {@link Placeholder.path | path},
   * {@link ExpectMessageBuilder.name},
   * {@link ExpectMessageBuilder.nestedMetadata}
   */
  name: string;

  /**
   * A placeholder for the word `"nil"`.
   *
   * @remarks
   * Can be of use when you want to fallback to the word `nil`
   * with proper {@link ExpectMessageBuilderOptions.wrapValues | wrapping} support,
   * and your value is undefined.
   *
   * This is used internally automatically for undefined variables on
   * {@link Placeholder.actual | actual} and {@link Placeholder.expected | expected},
   * but it's here for you incase you're doing some complex logic- or need it
   * for purposes beyond "actual" and "expected".
   *
   * @example
   * Let's say we were checking if an object was an arry:
   * ```ts
   * new ExpectMessageBuilder(
   *  `Expected ${place.name} to be an array`
   * );
   * ```
   *
   * In our method, we could do something like this:
   * ```ts
   * message.actualValue(actualValue ?? place.nil);
   * ```
   *
   * Then, our output would come out like so:
   * ```logs
   * Expected 'nil' to be an array
   * ```
   *
   * @see {@link Placeholder.undefined}
   */
  nil: string;

  /**
   * A placeholder for the word `"nil"`.
   *
   * @remarks
   * Is just a type alias for {@link Placeholder.nil}, for style
   * purposes.
   *
   * You can use whichever reads more comfortable for you.
   *
   * @see {@link Placeholder.nil}
   */
  undefined: string;

  /**
   * A placeholder for array {@link Placeholder.index | indices}.
   *
   * @remarks
   * Usually, indices are attached as {@link ExpectMessageBuilder.metadata | metadata},
   * but sometimes you might also want to show the index in your message.
   *
   * That's where the `index` placeholder comes into play.
   *
   * @example
   * For example, lets say we were testing if two arrays are equal.
   * ```ts
   * new ExpectMessageBuilder(
   *   `Expected the array ${place.actual.value} to ${place.not} equal ${place.expected.value}`
   * ).failureSuffix(`, but the ${place.index}nth element ${place.reason}`);
   * ```
   *
   * Which would result in the following output:
   * ```logs
   * Expected the array [1,2,3] to equal [1,2,4], but the 3nth element had a different value
   * ```
   *
   * @see {@link ExpectMessageBuilder.index}
   */
  index: string;
}

/**
 * Utility constant for specifying dynamic variables in {@link ExpectMessageBuilder | expect error messages}.
 *
 * @remarks
 * Implements the {@link Placeholder} interface.
 *
 * Can be used for cleaner messages.
 *
 * @example
 * ```ts
 * new ExpectMessageBuilder(
 *   `Expected ${place.name} to ${place.not} equal ${place.expected.value}`
 * );
 * ```
 *
 * @public
 */
export const place: Placeholder = {
  actual: {
    value: placeholder("actual_value"),
    fullValue: placeholder("full_actual_value"),
    type: placeholder("actual_type"),
  },
  expected: {
    value: placeholder("expected_value"),
    fullValue: placeholder("full_expected_value"),
    type: placeholder("expected_type"),
  },
  not: placeholder("not"),
  reason: placeholder("reason"),
  path: placeholder("path"),
  name: placeholder("name"),
  nil: placeholder("nil"),
  undefined: placeholder("nil"),
  index: placeholder("index"),
};
