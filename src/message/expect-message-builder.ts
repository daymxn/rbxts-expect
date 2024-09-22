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

import Object, { copy, deepCopy } from "@rbxts/object-utils";
import { Result } from "@rbxts/rust-classes";
import { HttpService } from "@rbxts/services";
import { trim } from "@rbxts/string-utils";
import type { Assertion, CustomMethodImpl, expect } from "@src/expect";
import type { ExpectConfig } from "@src/expect/config";
import { getDefaultExpectConfig } from "@src/expect/config";
import { isArray } from "@src/util/object";
import type { Proxy } from "@src/util/proxy";
import { capitalize } from "@src/util/string";
import { StringBuilder } from "@src/util/string-builder";
import { place, Placeholder } from "./placeholders";

/**
 * Data about the variables in an expect statement.
 *
 * @remarks
 * In practice, this is the `expect` and `actual` variables.
 *
 * @example
 * ```ts
 * // Given:
 * expect(5).to.not.equal("5");
 * // This would be the variable data:
 * const expectVariable: VariableData = {
 *   value: "5",
 *   type: "string"
 * };
 *
 * const actualVariable: VariableData = {
 *   value: 5,
 *   type: "number"
 * }
 * ```
 *
 * @see {@link ExpectMessageBuilder.expectVariable | expectVariable}, {@link ExpectMessageBuilder.actualVariable | actualVariable}
 *
 * @public
 */
export interface VariableData {
  /**
   * The value of this variable.
   *
   * @example
   * ```ts
   * expect(5).to.be.defined(); // 5 is the value
   * ```
   *
   * @see {@link ExpectMessageBuilder.expectedValue | expectedValue}, {@link ExpectMessageBuilder.actualValue | actualValue}
   */
  value: unknown;
  /**
   * The type of this variable, as a string.
   *
   * @remarks
   * If undefined, it will be set automatically during
   * {@link ExpectMessageBuilder.build | build} time to the
   * {@link VariableData.value | value} of this variable,
   * utilizing the macro
   * {@link https://github.com/roblox-ts/compiler-types/blob/a13fdb1171895c7ed1a7f091d18031534e988886/types/callMacros.d.ts#L11 | typeOf}.
   *
   * @example
   * ```ts
   * expect(5).to.be.defined(); // "number" is the type
   * ```
   *
   * @see {@link ExpectMessageBuilder.expectedType | expectedType}, {@link ExpectMessageBuilder.actualType | actualType}
   */
  type?: string;
}

interface ExpectMessageData {
  prefix: string;
  negationPrefix?: string;
  suffix?: string;
  negationSuffix?: string;
  failureSuffix?: string;
  trailingFailurePrefix?: string;
  reason?: string;
  index?: number | string;
  expected: VariableData;
  actual: VariableData;
  metadata: Record<string, unknown>;
  surfaceMetadata: Record<string, unknown>;
  failureMetadata: Record<string, unknown>;
  nestedMetadata: Record<string, unknown>;
  name?: string;
  path?: string;
}

const METADATA_SORT_ORDER: Record<string, number> = {
  index: 1,
  key: 2,
  value: 3,
  expected: 4,
  actual: 5,
};

const encodingCache = new WeakMap<object, string>();

/**
 * Configuration options for instances of {@link ExpectMessageBuilder}.
 *
 * @public
 */
export interface ExpectMessageBuilderOptions {
  /**
   * Trim the spaces around {@link Placeholder | placeholders} when they're absent.
   *
   * @remarks
   * This is different from {@link ExpectMessageBuilderOptions.trimWhiteSpace | trimWhiteSpace},
   * in that this only pertains to the space around absent {@link Placeholder | placeholders}.
   *
   * @defaultValue `true`
   *
   * @example
   * Given the following message:
   * ```ts
   * const baseMessage = new ExpectMessageBuilder(
   *   `Expected ${place.actual.value} to ${place.not} equal ${place.expected.value}`
   * );
   * ```
   * If the statement was _not_ negated, that means that `${place.not}` would be absent.
   *
   * With `trimSpaces: false`
   * ```ts
   * Expected 5 to   equal 5
   * ```
   *
   * With `trimSpaces: true`
   * ```ts
   * Expected 5 to equal 5
   * ```
   */
  trimSpaces: boolean;

  /**
   * Whether to wrap {@link VariableData} in quotes when output.
   *
   * @remarks
   * Strings are wrapped in double quotes (`"`) while everything else
   * is wrapped in single quotes (`'`).
   *
   * @defaultValue `true`
   *
   * @example
   * With `wrapValues: false`
   * ```ts
   * Expected 5 to equal daymon
   * ```
   *
   * With `wrapValues: true`
   * ```ts
   * Expected '5' to equal "daymon"
   * ```
   */
  wrapValues: boolean;

  /**
   * Whether to automatically attach {@link place.actual.fullValue | full}
   * versions of variables whenever they're {@link ExpectConfig.collapseLength | collapsed}.
   *
   * @remarks
   * If a {@link VariableData} is collapsed in the building of a message, its
   * non collapsed version will be appended after the metadata under
   * either `Expected (full):` or `Actual (full):`.
   *
   * Useful for ensuring your primary failure message is short (and easy to read quickly),
   * while retaining further details for debugging.
   *
   * @defaultValue `true`
   *
   * @example
   * With `attachFullOnCollapse: false`
   * ```ts
   * Expected {...} to equal {...}
   * ```
   *
   * With `attachFullOnCollapse: true`
   * ```ts
   * Expected {...} to equal {...}
   *
   * Expected (full): '{ name: "Daymon", age: 5 }'
   * Actual (full): '{ name: "Daymon", age: 6 }'
   * ```
   */
  attachFullOnCollapse: boolean;

  /**
   * Trim the white space around the message after building it.
   *
   * @remarks
   * This is different from {@link ExpectMessageBuilderOptions.trimSpaces | trimSpaces},
   * in that this only pertains to the space around the entire message.
   *
   * Will trim space at the start or end of a message, and does so only
   * after the message has been completely built and populated.
   *
   * @defaultValue `true`
   *
   * @example
   * Lets say you appended the path to the start of your messages:
   * ```ts
   * const baseMessage = new ExpectMessageBuilder(
   *   `${place.path} Expected ${place.actual.value} to ${place.not} equal ${place.expected.value}`
   * );
   * ```
   * If the statement ended up not having a path, your message would
   * come out with a leading space.
   *
   * With `trimWhiteSpace: false`
   * ```ts
   *  Expected 5 to equal 4
   * ```
   *
   * With `trimWhiteSpace: true`
   * ```ts
   * Expected 5 to equal 5
   * ```
   */
  trimWhiteSpace: boolean;
}

const defaultOptions: ExpectMessageBuilderOptions = {
  trimSpaces: true,
  wrapValues: true,
  attachFullOnCollapse: true,
  trimWhiteSpace: true,
};

/**
 * Builder for creating messages in an {@link expect} method.
 *
 * @remarks
 * You can look at this class as a wrapper around the error
 * messages a {@link CustomMethodImpl | method} can throw; while
 * providing various utility features to make populating
 * the message easier.
 *
 * Depending on your method, you may end up not using most
 * of what this class offers.
 *
 * ## Details
 * There are three (primary) components to an expect message:
 *
 * - The core contents of the message
 * - The {@link VariableData} for "actual" and "expect"
 * - Various (optional) metadata
 *
 * ### Core Message
 *
 * The "core" of a message is the content that's not
 * populated by {@link Placeholder | placeholders}.
 *
 * Generally, this is static- but it doesn't have to be.
 *
 * For example, given the message:
 * ```text
 * Expected '[1,2,3]' to be empty
 * ```
 *
 * The "core" part would be the `Expected to be empty`.
 *
 * You can generally break this down into two components:
 * the prefix and the suffix.
 *
 * The prefix is usually static, and populated when you create
 * your message:
 * ```ts
 * new ExpectMessageBuilder(`Expected ${place.actual.value} to ${place.not} be empty`);
 * ```
 *
 * The "suffix" comes into play usually at runtime; where you have additional context.
 * ```text
 * Expected '[1,2,3]' to be empty, but it had 3 elements
 * ```
 *
 * In this case, `, but it had 3 elements` is the suffix.
 *
 * ### Variable Data
 *
 * The {@link VariableData} in a message corresponds to the data
 * associated with a variable in the expression.
 *
 * There are typically two variables: the "expected" variable,
 * and the "actual" variable.
 *
 * The "actual" variable is the one provided to {@link expect}
 * when the statement starts.
 *
 * The "expected" variable is the one provided to the method
 * that's performing the check.
 *
 * ```ts
 * expect(5).to.not.equal("5");
 * ```
 *
 * In this case, `5` is the "actual" variable and `"5"` is the
 * "expected" variable.
 *
 * Although, some checks may not have an expected variable.
 *
 * ```ts
 * expect([]).to.be.empty();
 * ```
 *
 * In this case, `[]` is the "actual" variable, but there's
 * nothing we're comparing it to so there's not really
 * an "expected" variable.
 *
 * ### Metadata
 *
 * The metadata in a message is additional data that follows
 * after the message in the format of `key: value` with a newline
 * for each.
 *
 * ```text
 * Expected '[1,"2",3]' to be an array of type 'number', but there was an element of type 'number'.
 * Index: 1
 * Value: "2"
 * ```
 *
 * In this case, the metadata is the
 * ```
 * Index: 1
 * Value: "2"
 * ```
 *
 * @see {@link ExpectMessageBuilder.use | use}
 *
 * @public
 */
export class ExpectMessageBuilder {
  /**
   * @internal
   */
  private data: ExpectMessageData;

  /**
   * The {@link ExpectMessageBuilderOptions | options} configured to this
   * instance.
   */
  public readonly options: ExpectMessageBuilderOptions;

  /**
   * Create a new instance of {@link ExpectMessageBuilder}.
   *
   * @remarks
   * Intended to be used in custom {@link CustomMethodImpl | methods} for
   * {@link expect}.
   *
   * If you don't provide a `prefix`, you can instead use a {@link place.reason | reason} to
   * create your message at runtime.
   *
   * @param prefix - Contents of the message, generally the static portion (defaults to {@link place.reason}).
   * @param negationPrefix - A prefix to use when the message is {@link Assertion.not | negated} (replaces the standard prefix).
   * If you don't provide a negation prefix, the `prefix` will be used instead (in the case of negations).
   * @param options - Configuration settings for message output.
   *
   * @see {@link ExpectMessageBuilder.use | use}
   */
  constructor(
    prefix: string = place.reason,
    negationPrefix?: string,
    options: Partial<ExpectMessageBuilderOptions> = {}
  ) {
    this.data = {
      prefix,
      negationPrefix,
      expected: {
        value: undefined,
        type: undefined,
      },
      actual: {
        value: undefined,
        type: undefined,
      },
      metadata: {},
      nestedMetadata: {},
      surfaceMetadata: {},
      failureMetadata: {},
    };
    this.options = {
      ...defaultOptions,
      ...options,
    };
  }

  /**
   * Creates a deep copy of this instance.
   *
   * @remarks
   * All of the data that has been added to it so far will still be attached.
   *
   * You generally want to use the {@link ExpectMessageBuilder.use | use} method
   * instead, although there's not any functional different at this moment.
   */
  public copy(): ExpectMessageBuilder {
    const newInstance = new ExpectMessageBuilder(
      this.data.prefix,
      this.data.negationPrefix,
      copy(this.options)
    );
    newInstance.data = deepCopy(this.data);

    return newInstance;
  }

  /**
   * Create a copy of this instance, to be populated with data.
   *
   * @remarks
   * This is the primary entry point into using a message.
   *
   * Since data attached to an {@link ExpectMessageBuilder} persists,
   * if you _don't_ create a copy of the instance in your method, the next
   * caller will still have that data in their message.
   *
   * @param trailingPrefix - An additional string to add at the end of the existing prefix (including the negation prefix).
   * @param trailingFailurePrefix - An additional string to add at the end of the existing prefix,
   * but only in the case of failure (replaces the existing {@link ExpectMessageBuilder.trailingFailurePrefix | trailingFailurePrefix}).
   *
   * @returns A new copy of this instance, ready to be used.
   *
   * @example
   * ```ts
   * const baseMessage = new ExpectMessageBuilder(
   *   `Expected ${place.name} to ${place.not} equal ${place.expected.value}`
   * );
   *
   * const equal: CustomMethodImpl<defined> = (
   *   _,
   *   actual: defined,
   *   expected: defined
   * ) => {
   *   const message = baseMessage.use().expectedValue(expected);
   *
   *   return actual === expected ? message.pass() : message.fail();
   * };
   * ```
   *
   * @see {@link ExpectMessageBuilder.pass | pass}, {@link ExpectMessageBuilder.fail | fail}
   */
  public use(
    trailingPrefix?: string,
    trailingFailurePrefix?: string
  ): ExpectMessageBuilder {
    const instance = this.copy();

    if (trailingPrefix !== undefined) {
      instance.data.prefix = `${instance.data.prefix}${trailingPrefix}`;
      if (this.data.negationPrefix !== undefined) {
        instance.data.negationPrefix = `${instance.data.negationPrefix}${trailingPrefix}`;
      }
    }

    instance.data.trailingFailurePrefix =
      trailingFailurePrefix ?? instance.data.trailingFailurePrefix;

    return instance;
  }

  /**
   * Adds a string to the end of the existing prefix.
   *
   * @remarks
   * This includes the negation prefix (if any).
   *
   * @param str - The string to add to the end of the prefix.
   *
   * @returns This instance, for chaining.
   *
   * @example
   * ```ts
   * new ExpectMessageBuilder(
   *   `Expected ${place.name} to ${place.not} equal ${place.expected.value}`
   * ).appendPrefix(", but it was not.");
   *
   * // Would be the same as
   * new ExpectMessageBuilder(
   *   `Expected ${place.name} to ${place.not} equal ${place.expected.value},
   * but it was not.`
   * );
   * ```
   */
  public appendPrefix(str: string): this {
    this.data.prefix = `${this.data.prefix}${str}`;
    if (this.data.negationPrefix !== undefined) {
      this.data.negationPrefix = `${this.data.negationPrefix}${str}`;
    }

    return this;
  }

  /**
   * Adds a string to show at the end of the message, before the metadata.
   *
   * @remarks
   * _Note that there can only be one, calling this method again will replace
   * the previous value- not append to it_
   *
   * @param str - The string to add after the message.
   *
   * @returns This instance, for chaining.
   *
   * @example
   * ```ts
   * new ExpectMessageBuilder(
   *   `Expected ${place.name} to ${place.not} equal ${place.expected.value}`
   * )
   * .suffix(` because ${place.reason}`)
   * .appendPrefix(", but it was not");
   *
   * // Would be the same as
   * new ExpectMessageBuilder(
   *   `Expected ${place.name} to ${place.not} equal ${place.expected.value},
   * but it was not because ${place.reason}`
   * );
   * ```
   *
   * @see {@link ExpectMessageBuilder.negationSuffix | negationSuffix}, {@link ExpectMessageBuilder.failureSuffix | failureSuffix}
   */
  public suffix(str?: string): this {
    this.data.suffix = str;

    return this;
  }

  /**
   * Adds a string to show at the end of the message, before the metadata.
   *
   * Only applies if the message is {@link Assertion.not | negated}.
   *
   * @remarks
   * Will be used instead of the existing {@link Assertion.suffix | suffix} (if any).
   *
   * _Note that there can only be one, calling this method again will replace
   * the previous value- not append to it_
   *
   * @param str - The string to add after the message.
   *
   * @returns This instance, for chaining.
   *
   * @example
   * ```ts
   * new ExpectMessageBuilder(
   *   `Expected ${place.name} to ${place.not} equal ${place.expected.value}`
   * )
   * .suffix(", but it was not.")
   * .negationSuffix(", but it did");
   *
   * // Would be the same as
   * new ExpectMessageBuilder(
   *   `Expected ${place.name} to equal ${place.expected.value},
   * but it was not.`,
   *
   *   `Expected ${place.name} to NOT equal ${place.expected.value},
   * but it did.`,
   * );
   * ```
   *
   * @see {@link ExpectMessageBuilder.suffix | suffix}, {@link ExpectMessageBuilder.failureSuffix | failureSuffix}
   */
  public negationSuffix(str?: string): this {
    this.data.negationSuffix = str;

    return this;
  }

  /**
   * Adds a string to show at the end of the message, before the metadata.
   *
   * Only applies if the message is a {@link Assertion.fail | failure}.
   *
   * @remarks
   * Comes _after_ the {@link Assertion.suffix | suffix} (if any).
   *
   * _Note that there can only be one, calling this method again will replace
   * the previous value- not append to it_
   *
   * @param str - The string to add after the message.
   *
   * @returns This instance, for chaining.
   *
   * @example
   * ```ts
   * new ExpectMessageBuilder(
   *   `Expected ${place.name} to ${place.not} equal ${place.expected.value}`
   * )
   * .suffix(", but it was not.")
   * .negationSuffix(", but it did")
   * .failureSuffx(` because ${place.reason}`);
   *
   * // Would be the same as
   * new ExpectMessageBuilder(
   *   `Expected ${place.name} to equal ${place.expected.value},
   * but it was not because ${place.reason}`,
   *
   *   `Expected ${place.name} to NOT equal ${place.expected.value},
   * but it did because ${place.reason}`,
   * );
   * ```
   *
   * @see {@link ExpectMessageBuilder.suffix | suffix}, {@link ExpectMessageBuilder.negationSuffix | negationSuffix}
   */
  public failureSuffix(str?: string): this {
    this.data.failureSuffix = str;

    return this;
  }

  /**
   * Adds a string to the end of the existing prefix, but only if it's
   * a {@link ExpectMessageBuilder.fail | failure}.
   *
   * @remarks
   * Usually, this means `!negated`. So you can also look at this
   * as a trailing prefix for non negated use-cases.
   *
   * Comes before the {@link ExpectMessageBuilder.suffix | suffix}.
   *
   * _Note that there can only be one, calling this method again will replace
   * the previous value- not append to it_
   *
   * @param str - The string to add to the end of the prefix.
   *
   * @returns This instance, for chaining.
   *
   * @example
   * ```ts
   * new ExpectMessageBuilder(
   *   `Expected ${place.name} to ${place.not} equal ${place.expected.value}`
   * ).trailingFailurePrefix(", but it was not.");
   *
   * // Would be the same as
   * new ExpectMessageBuilder(
   *   `Expected ${place.name} to equal ${place.expected.value},
   * but it was not.`
   *
   *   `Expected ${place.name} to NOT equal ${place.expected.value}`
   * );
   * ```
   *
   * @see {@link ExpectMessageBuilder.appendPrefix | appendPrefix}
   */
  public trailingFailurePrefix(str?: string): this {
    this.data.trailingFailurePrefix = str;

    return this;
  }

  /**
   * Sets a {@link place.name | name} to use for the "actual" variable,
   * when dealing with messages without {@link ExpectMessageBuilder.path | paths}.
   *
   * @remarks
   * The value does not need to be a string, as the method
   * will call `tostring` for you.
   *
   * This can be useful in try-catch blocks, as the error
   * attached to `catch` is `undefined` due to typescript.
   *
   * @param value - A displayable value to use as a {@link place.name | name}, or undefined
   * to reset it (which defaults to the {@link place.actual.value | actual value}).
   *
   * @returns This instance, for chaining.
   *
   * @example
   * Given the message:
   * ```ts
   * new ExpectMessageBuilder(
   *   `Expected ${place.name} to ${place.not} have a length
   * of ${place.expected.value}`
   * ).name("the object");
   * ```
   * For messages with paths:
   * ```text
   * Expected parent.cars to have a length of '3'
   * ```
   * For messages without paths:
   * ```text
   * Expected the object to have a length of '3'
   * ```
   *
   * @see {@link Placeholder.name}, {@link ExpectMessageBuilder.path | path}
   */
  public name(value?: unknown): this {
    if (value !== undefined) {
      this.data.name = tostring(value);
    } else {
      this.data.name = undefined;
    }

    return this;
  }

  /**
   * Sets a {@link place.path | path} to use for the "actual" variable,
   * when dealing with nested tests.
   *
   * @remarks
   * If you're using a {@link Proxy | proxy}, this will be automatically populated.
   *
   * @param str - A displayable value to use as the {@link place.path | path}, or undefined
   * to reset it to empty.
   *
   * @returns This instance, for chaining.
   *
   * @example
   * Given the message:
   * ```ts
   * new ExpectMessageBuilder(
   *   `${place.path} - Expected ${place.actual.value} to ${place.not} have a length
   * of ${place.expected.value}`
   * );
   * ```
   * For messages with paths:
   * ```text
   * parent.cars - Expected '["Tesla","Civic"]' to have a length of '3'
   * ```
   * For messages without paths:
   * ```text
   * - Expected '["Tesla","Civic"]' to have a length of '3'
   * ```
   *
   * @see {@link Placeholder.path}, {@link ExpectMessageBuilder.name | name}
   */
  public path(str?: string): this {
    this.data.path = str;

    return this;
  }

  /**
   * Attach data to follow after the main message, in the format of `key: value`.
   *
   * @remarks
   * Each entry is seperated by a newline.
   *
   * Useful for data that is only known at runtime, or data that is only needed
   * for additional debugging- and should be seperate from the main contents
   * of the message.
   *
   * Metadata is sorted alphabetically in the output, but priority is placed
   * for the following keys (in order): 'index', 'key', 'value', 'expected', 'actual'.
   *
   * So if any of those keys are in your metadata, they'll come before the rest of
   * your metadata. The capitalization doesn't matter either, so long as the keys
   * are _exactly_ equal.
   *
   * _Note that this merges with any existing metadata, so you can safely
   * call this multiple times to add more data or overwrite previous data_
   *
   * @param data - An object of `key:value` pairs to attach after the message.
   *
   * @returns This instance, for chaining.
   *
   * @example
   * Lets say we're checking that all the values in an array are equal to
   * an `expected` value.
   * ```ts
   * for(const [index, value] of ipairs(actual)) {
   *   message.metadata({ Index: index, Value: value });
   *   if(value !== expected) return message.fail();
   * }
   * ```
   * Our output will look like so:
   * ```text
   * Expected '[1,1,2]' to all be equal to '1', but there was a value that was not.
   * Index: 3
   * Value: 2
   * ```
   *
   *
   * @see {@link ExpectMessageBuilder.failureMetadata | failureMetadata},
   * {@link ExpectMessageBuilder.nestedMetadata | nestedMetadata},
   * {@link ExpectMessageBuilder.surfaceMetadata | surfaceMetadata}
   */
  public metadata(data: Record<string, unknown>): this {
    this.data.metadata = {
      ...this.data.metadata,
      ...data,
    };

    return this;
  }

  /**
   * Attach data to follow after the main message, in the format of `key: value`.
   *
   * Only attached when the message is a {@link ExpectMessageBuilder.fail | failure}.
   *
   * @remarks
   * The same as {@link ExpectMessageBuilder.metadata | metadata}, but is limited
   * to only failures.
   *
   * A failure is effectively the same thing as `!negated`.
   *
   * Useful for when you wanna conditionally attach data, but only when the
   * case is not a negation.
   *
   * Will come _after_ the {@link ExpectMessageBuilder.metadata | metadata} (if any).
   *
   * _Note that this merges with any existing failure metadata, so you can safely
   * call this multiple times to add more data or overwrite previous data_
   *
   * @param data - An object of `key:value` pairs to attach after the message.
   *
   * @returns This instance, for chaining.
   *
   * @example
   * Lets say we're checking that all the values in an array are equal to
   * an `expected` value.
   * ```ts
   * for(const [index, value] of ipairs(actual)) {
   *   message.failureMetadata({ Index: index, Value: value });
   *   if(value !== expected) return message.fail();
   * }
   * ```
   * Our output will look like so:
   * ```text
   * Expected '[1,1,2]' to all be equal to '1', but there was a value that was not.
   * Index: 3
   * Value: 2
   * ```
   *
   * Which might look the same as using a normal `metadata`, but the difference
   * comes into play when the result is a pass.
   *
   * If we used normal `metadata`, and our check was passed- but it was negated,
   * our output would look like so:
   * ```text
   * Expected '[1,1,1]' to NOT all be equal to '1'.
   * Index: 3
   * Value: 1
   * ```
   *
   * But if we use `failureMetadata` instead, it won't be attached in the
   * case of a pass:
   * ```text
   * Expected '[1,1,1]' to NOT all be equal to '1'.
   * ```
   *
   * @see {@link ExpectMessageBuilder.metadata | metadata},
   * {@link ExpectMessageBuilder.nestedMetadata | nestedMetadata},
   * {@link ExpectMessageBuilder.surfaceMetadata | surfaceMetadata}
   */
  public failureMetadata(data: Record<string, unknown>): this {
    this.data.failureMetadata = {
      ...this.data.failureMetadata,
      ...data,
    };

    return this;
  }

  /**
   * Attach data to follow after the main message, in the format of `key: value`.
   *
   * Only attached when the message has a {@link Placeholder.path | path}.
   *
   * @remarks
   * The same as {@link ExpectMessageBuilder.metadata | metadata}, but is limited
   * to only messages with {@link Placeholder.path | paths}.
   *
   * Useful for when you wanna conditionally attach data, but only when the
   * case is on nested objects.
   *
   * Will come _before_ all other metadata types (if any).
   *
   * _Note that this merges with any existing nested metadata, so you can safely
   * call this multiple times to add more data or overwrite previous data_
   *
   * @param data - An object of `key:value` pairs to attach after the message.
   *
   * @returns This instance, for chaining.
   *
   * @example
   * A very common use-case is attaching data about the actual value for nested objects,
   * so you still get the path to the variable in the initial message.
   * ```ts
   * const baseMessage = new ExpectMessageBuilder(
   *   `Expected ${place.name} to ${place.not} equal ${place.expected.value} (${place.expected.type})`
   * )
   * .name(`${place.actual.value} (${place.actual.type})`)
   * .nestedMetadata({
   *   [place.path]: `${place.actual.value} (${place.actual.type})`,
   * });
   * ```
   * Example output for messages without a path:
   * ```text
   * Expected '5' (number) to equal "5" (string)
   * ```
   *
   * Example output for messages with a path:
   * ```text
   * Expected parent.age to equal "5" (string)
   *
   *   parent.age: '5' (number)
   * ```
   *
   * @see {@link ExpectMessageBuilder.failureMetadata | failureMetadata},
   * {@link ExpectMessageBuilder.metadata | metadata},
   * {@link ExpectMessageBuilder.surfaceMetadata | surfaceMetadata}
   */
  public nestedMetadata(data: Record<string, unknown>): this {
    this.data.nestedMetadata = {
      ...this.data.nestedMetadata,
      ...data,
    };

    return this;
  }

  /**
   * Attach data to follow after the main message, in the format of `key: value`.
   *
   * Only attached when the message does NOT have a {@link Placeholder.path | path}.
   *
   * @remarks
   * The same as {@link ExpectMessageBuilder.metadata | metadata}, but is limited
   * to only messages without {@link Placeholder.path | paths}.
   *
   * Useful for when you wanna conditionally attach data, but only when the
   * case is on non nested objects.
   *
   * Will come _before_ all other metadata types (if any).
   *
   * _Note that this merges with any existing surface metadata, so you can safely
   * call this multiple times to add more data or overwrite previous data_
   *
   * @param data - An object of `key:value` pairs to attach after the message.
   *
   * @returns This instance, for chaining.
   *
   * @example
   * For example, let's say we were checking if an object was empty,
   * and we wanted to use the name `the object` to keep the message short:
   * ```ts
   * const baseMessage = new ExpectMessageBuilder(
   *  `Expected ${place.name} to ${place.not} be empty`
   * )
   * .name("the object")
   * .nestedMetadata({ [place.path]: place.actual.value });
   * ```
   * We might have logic like so:
   * ```ts
   * if (amount > 1) {
   *  return message
   *   .suffix(`, but it had ${amount} keys`)
   *   .surfaceMetadata({ Value: place.actual.value })
   *   .fail();
   * ```
   *
   * Example output for messages without a path:
   * ```text
   * Expected the object to be empty, but it had 2 keys
   *
   * Value: '{"name":"Daymon","age":24}'
   * ```
   *
   * Example output for messages with a path:
   * ```text
   * Expected parent.parent to be empty, but it had 2 keys
   *
   * parent.parent: '{"name":"Daymon","age":24}'
   * ```
   *
   * @see {@link ExpectMessageBuilder.failureMetadata | failureMetadata},
   * {@link ExpectMessageBuilder.nestedMetadata | nestedMetadata},
   * {@link ExpectMessageBuilder.metadata | metadata}
   */
  public surfaceMetadata(data: Record<string, unknown>): this {
    this.data.surfaceMetadata = {
      ...this.data.surfaceMetadata,
      ...data,
    };

    return this;
  }

  /**
   * Sets a value to use for the {@link place.reason | reason}.
   *
   * @remarks
   * If the message does _not_ have a `${place.reason}` in it,
   * but was thrown with a `reason` attached via this method-
   * then the reason will be displayed before the {@link ExpectMessageBuilder.metadata | metadata},
   * in the same format of `Reason: message`.
   *
   * @param reason - A displayable value to use as a replacement for {@link place.reason | reason},
   * or undefined to reset it to nothing.
   *
   * @returns This instance, for chaining.
   *
   * @example
   * Lets say we were checking if two values are equal:
   * ```ts
   * const baseMessage = new ExpectMessageBuilder(
   *   `Expected ${place.name} to ${place.not} equal ${place.expected.value}, but ${place.reason}`
   * );
   *
   * const equal: CustomMethodImpl<defined> = (
   *   _,
   *   actual: defined,
   *   expected: defined
   * ) => {
   *   const message = baseMessage.use().expectedValue(expected);
   *
   *   if(typeOf(actual) !== typeOf(expected)) {
   *     return message.reason("it was a different type").fail();
   *   }
   *
   *   if(actual !== value) {
   *     return message.reason("it had a different value").fail();
   *   }
   *
   *   // apply a default reason for negations
   *   return message.reason("it did").pass();
   * };
   * ```
   * Example output:
   * ```text
   * Expected "4" to equal '4', but it was a different type
   * ```
   *
   * @example
   * If our message didn't have a reason placeholder in it, like so:
   * ```ts
   * new ExpectMessageBuilder(
   *   `Expected ${place.name} to ${place.not} equal ${place.expected.value}`
   * );
   * ```
   *
   * But we still called `reason` in our logic, then it would get attached
   * as metadata, but before any existing metadata:
   * ```text
   * Expected "4" to equal '4'
   * Reason: it was a different type
   * ```
   *
   * @see {@link Placeholder.reason}, {@link ExpectMessageBuilder.failWithReason | failWithReason}
   */
  public reason(reason?: string): this {
    this.data.reason = reason;

    return this;
  }

  /**
   * Sets a value to use for the {@link place.expected.value | expected value}.
   *
   * @remarks
   * This is usually the first thing your do when creating a message in your method.
   *
   * The reason you have to do this yourself, instead of {@link expect} handling it
   * for you- is because your test case may not have an expected value. Or the expected
   * value may not be the first argument.
   *
   * The {@link Assertion.enum | enum} method is a perfect example of this; where the first
   * argument is the enum type, and the second argument is the value to check for.
   *
   * @param value - The value of the {@link place.expected | expected} variable.
   *
   * @returns This instance, for chaining.
   *
   * @example
   * Lets say we were checking if two values are equal:
   * ```ts
   * const baseMessage = new ExpectMessageBuilder(
   *   `Expected ${place.name} to ${place.not} equal ${place.expected.value}`
   * );
   *
   * const equal: CustomMethodImpl<defined> = (
   *   _,
   *   actual: defined,
   *   expected: defined
   * ) => {
   *   const message = baseMessage.use().expectedValue(expected);
   *   // ...
   * };
   * ```
   * Example output:
   * ```text
   * Expected "4" to equal '4'
   * ```
   *
   * @see {@link Placeholder.expected.value},
   * {@link ExpectMessageBuilder.expectedType | expectedType},
   * {@link ExpectMessageBuilder.expected | expected},
   * {@link ExpectMessageBuilder.actualValue | actualValue}
   */
  public expectedValue(value?: unknown): this {
    this.data.expected.value = value;

    return this;
  }

  /**
   * Sets a value to use for the {@link place.expected.type | expected type}.
   *
   * @remarks
   * You usually don't need to set this yourself.
   *
   * This comes in handy when you wanna provide additional type information about
   * the expected type.
   *
   * The {@link Assertion.enum | enum} method is a perfect example of this;
   * where the type for enum values becomes `enum/number` instead of `number`.
   *
   * @param typeStr - The type of the {@link place.expected | expected} variable as a string,
   * or undefined to reset it (defaults to the `typeOf` of the {@link ExpectMessageBuilder.expectedValue | expectedValue}).
   *
   * @returns This instance, for chaining.
   *
   * @example
   * Lets say we were checking if types are equal, but wanted to support
   * a custom class:
   * ```ts
   * const baseMessage = new ExpectMessageBuilder(
   *   `Expected ${place.name} to ${place.not} equal ${place.expected.value} (${place.expected.type})`
   * );
   *
   * const customEqual: CustomMethodImpl<defined> = (
   *   _,
   *   actual: defined,
   *   expected: defined
   * ) => {
   *   const message = baseMessage.use().expectedValue(expected);
   *
   *   if(isMyCustomType(expected)) {
   *     message.expectedType("MyCustomType");
   *     // ...
   *   }
   * };
   * ```
   * Example output:
   * ```text
   * Expected "4" to equal '4' (number)
   * Expected '{"name":"Daymon"}' to equal '{"name":"Bryan"}' (MyCustomType)
   * ```
   *
   * @see {@link Placeholder.expected.type},
   * {@link ExpectMessageBuilder.expectedValue | expectedValue},
   * {@link ExpectMessageBuilder.expected | expected},
   * {@link ExpectMessageBuilder.actualType | actualType}
   */
  public expectedType(typeStr?: string): this {
    this.data.expected.type = typeStr;

    return this;
  }

  /**
   * Overwrites all the values for the {@link place.expected | expected} variable.
   *
   * @remarks
   * Instead of calling {@link ExpectMessageBuilder.expectedValue | expectedValue} and
   * {@link ExpectMessageBuilder.expectedType | expectedType} separately, you can call
   * this method to set them both at once.
   *
   * @param data - A {@link VariableData} containing the {@link VariableData.type | type}
   * and {@link VariableData.value | value} of the {@link place.expected | expected} variable.
   *
   * @returns This instance, for chaining.
   *
   * @example
   * ```ts
   * const customEqual: CustomMethodImpl<defined> = (
   *   _,
   *   actual: defined,
   *   expected: defined
   * ) => {
   *   const message = baseMessage.use().expected({
   *     value: expected,
   *     type: typeOf(expected)
   *   });
   *
   *   // ...
   * };
   * ```
   *
   * @see {@link Placeholder.expected},
   * {@link ExpectMessageBuilder.expectedValue | expectedValue},
   * {@link ExpectMessageBuilder.expectedType | expectedType},
   * {@link ExpectMessageBuilder.actual | actual}
   */
  public expected(data: VariableData): this {
    this.data.expected = data;

    return this;
  }

  /**
   * Sets a value to use for the {@link place.actual.value | actual value}.
   *
   * @remarks
   * This is automatically set by {@link expect} whenever a message is built,
   * but you can provide your own if you need to.
   *
   * This can come in handy when you have additional context, or a better way
   * to represent the "actual" value.
   *
   * @param value - The value of the {@link place.actual | actual} variable.
   *
   * @returns This instance, for chaining.
   *
   * @example
   * Lets say we were checking if two values are equal, but wanted to
   * support enum values:
   * ```ts
   * const baseMessage = new ExpectMessageBuilder(
   *   `Expected ${place.name} to ${place.not} equal ${place.expected.value}`
   * );
   *
   * const equal: CustomMethodImpl<defined> = (
   *   _,
   *   enumTable,
   *   actual: defined,
   *   expected: defined
   * ) => {
   *   const message = baseMessage.use().expectedValue(expected);
   *   const valueAsEnum = enumTable[actual];
   *   message.actualValue(valueAsEnum);
   *   // ...
   * };
   * ```
   * So instead of this output:
   * ```text
   * Expected '0' to equal "Basketball"
   * ```
   * We can get this output:
   * ```text
   * Expected "Soccer" to equal "Basketball"
   * ```
   *
   * @see {@link Placeholder.actual.value},
   * {@link ExpectMessageBuilder.actualType | actualType},
   * {@link ExpectMessageBuilder.actual | actual},
   * {@link ExpectMessageBuilder.expectedValue | expectedValue}
   */
  public actualValue(value?: unknown): this {
    this.data.actual.value ??= value;

    return this;
  }

  /**
   * Sets a value to use for the {@link place.actual.type | actual type}.
   *
   * @remarks
   * You usually don't need to set this yourself.
   *
   * This comes in handy when you wanna provide additional type information about
   * the actual type.
   *
   * The {@link Assertion.enum | enum} method is a perfect example of this;
   * where the type for enum values becomes `enum/number` instead of `number`.
   *
   * @param typeStr - The type of the {@link place.actual | actual} variable as a string,
   * or undefined to reset it (defaults to the `typeOf` of the {@link ExpectMessageBuilder.actualValue | actualValue}).
   *
   * @returns This instance, for chaining.
   *
   * @example
   * Lets say we were checking if types are equal, but wanted to support
   * a custom class:
   * ```ts
   * const baseMessage = new ExpectMessageBuilder(
   *   `Expected ${place.actual.value} (${place.actual.type}) to ${place.not} equal ${place.expected.value}`
   * );
   *
   * const customEqual: CustomMethodImpl<defined> = (
   *   _,
   *   actual: defined,
   *   expected: defined
   * ) => {
   *   const message = baseMessage.use().expectedValue(expected);
   *
   *   if(isMyCustomType(actual)) {
   *     message.actualType("MyCustomType");
   *     // ...
   *   }
   * };
   * ```
   * Example output:
   * ```text
   * Expected "4" (number) to equal '4'
   * Expected '{"name":"Daymon"}' (MyCustomType) to equal '{"name":"Bryan"}'
   * ```
   *
   * @see {@link Placeholder.actual.type},
   * {@link ExpectMessageBuilder.actualValue | actualValue},
   * {@link ExpectMessageBuilder.actual | actual},
   * {@link ExpectMessageBuilder.expectedType | expectedType}
   */
  public actualType(typeStr?: string): this {
    this.data.actual.type = typeStr;

    return this;
  }

  /**
   * Overwrites all the values for the {@link place.actual | actual} variable.
   *
   * @remarks
   * Instead of calling {@link ExpectMessageBuilder.actualValue | actualValue} and
   * {@link ExpectMessageBuilder.actualType | actualType} separately, you can call
   * this method to set them both at once.
   *
   * @param data - A {@link VariableData} containing the {@link VariableData.type | type}
   * and {@link VariableData.value | value} of the {@link place.actual | actual} variable.
   *
   * @returns This instance, for chaining.
   *
   * @example
   * ```ts
   * const customEqual: CustomMethodImpl<defined> = (
   *   _,
   *   actual: defined,
   *   expected: defined
   * ) => {
   *   const message = baseMessage.use().actual({
   *     value: actual,
   *     type: typeOf(actual)
   *   });
   *
   *   // ...
   * };
   * ```
   *
   * @see {@link Placeholder.expected},
   * {@link ExpectMessageBuilder.expectedValue | expectedValue},
   * {@link ExpectMessageBuilder.expectedType | expectedType},
   * {@link ExpectMessageBuilder.actual | actual}
   */
  public actual(data: VariableData): this {
    this.data.actual = data;

    return this;
  }

  /**
   * Sets a value for the {@link place.index | index} placeholder.
   *
   * @remarks
   * Usually, indexies are attached as {@link ExpectMessageBuilder.metadata | metadata},
   * but sometimes you might also want to show the index in your message.
   *
   * That's where the {@link place.index | index} placeholder comes into play.
   *
   * @param str - A number or string as the {@link place.index | index}, or undefined
   * to reset it to empty.
   *
   * @returns This instance, for chaining.
   *
   * @example
   * For example, lets say we were testing if two arrays are equal.
   * ```ts
   * new ExpectMessageBuilder(
   *   `Expected the array ${place.actual.value} to ${place.not} equal ${place.expected.value}`
   * ).failureSuffix(`, but the ${place.index}nth element ${place.reason}`);
   * ```
   * We might use logic like so:
   * ```ts
   * for(const [index, value] of ipairs(actual)) {
   *   if(expected[index] !== actual[index]) {
   *     return message.failWithReason("had a different value");
   *   }
   * }
   * ```
   *
   * Which would result in the following output:
   * ```text
   * Expected the array [1,2,3] to equal [1,2,4], but the 3nth element had a different value
   * ```
   *
   * @see {@link Placeholder.index}
   */
  public index(index?: number | string): this {
    this.data.index = index;

    return this;
  }

  /**
   * Returns a `Result.ok` of this instance.
   *
   * @remarks
   * Used to signify that the check passed, and that everything was as expected.
   *
   * Returning a message is important, because the {@link CustomMethodImpl | method} doesn't
   * know if the check was {@link Assertion.not | negated} or not.
   *
   * In other-words, even though your check passed- it could still result in an error message.
   *
   * The data you return in your message is used to populate that error.
   *
   * @example
   * For example, lets say we were checking if two values were equal.
   * ```ts
   * const baseMessage = new ExpectMessageBuilder(
   *   `Expected ${place.name} to ${place.not} equal ${place.expected.value}`
   * );
   *
   * const equal: CustomMethodImpl<defined> = (
   *   _,
   *   actual: defined,
   *   expected: defined
   * ) => {
   *   const message = baseMessage.use().expectedValue(expected);
   *
   *   return actual === expected ? message.pass() : message.fail();
   * };
   * ```
   *
   * If the values are equal, we return a `pass`. This means no error
   * message is thrown.
   *
   * But what if the user expected the values to NOT be equal?
   * ```ts
   * expect(5).to.not.equal(5);
   * ```
   *
   * In this case, `expect` is looking to see if the `equal` check passes.
   * If it does, then we throw an error.
   * ```text
   * Expected '5' to NOT equal '5'.
   * ```
   *
   * @see {@link ExpectMessageBuilder.fail | fail}
   */
  public pass(): Result<ExpectMessageBuilder, ExpectMessageBuilder> {
    return Result.ok(this);
  }

  /**
   * Returns a `Result.err` of this instance.
   *
   * @remarks
   * Used to signify that the check failed, and that something was not as expected.
   *
   * Keep in mind that even if the message failed, that doesn't mean an error will be thrown;
   * because the {@link CustomMethodImpl | method} doesn't know if the check was
   * {@link Assertion.not | negated} or not.
   *
   * In other-words, even though your check fails- it might not result in an error message.
   *
   * In the case that it does, the data you return in your message is used to populate that error.
   *
   * @example
   * For example, lets say we were checking if two values were equal.
   * ```ts
   * const baseMessage = new ExpectMessageBuilder(
   *   `Expected ${place.name} to ${place.not} equal ${place.expected.value}`
   * );
   *
   * const equal: CustomMethodImpl<defined> = (
   *   _,
   *   actual: defined,
   *   expected: defined
   * ) => {
   *   const message = baseMessage.use().expectedValue(expected);
   *
   *   return actual === expected ? message.pass() : message.fail();
   * };
   * ```
   *
   * If the values are NOT equal, we return a `fail`. This means an error
   * message is thrown.
   * ```text
   * Expect '5' to equal '4'
   * ```
   *
   * But what if the user expected the values to not be equal?
   * ```ts
   * expect(5).to.not.equal(4);
   * ```
   *
   * In this case, `expect` is looking to see if the `equal` check fails.
   * If it does, then we don't throw an error.
   *
   * @see {@link ExpectMessageBuilder.pass | pass}
   */
  public fail(): Result<ExpectMessageBuilder, ExpectMessageBuilder> {
    return Result.err(this);
  }

  /**
   * Returns a {@link ExpectMessageBuilder.fail | failure} with the
   * {@link ExpectMessageBuilder.reason | reason} attached.
   *
   * @param reason
   *
   * @example
   * ```ts
   * return message.failWithReason("but it was not");
   *
   * // is the same as:
   * return message.reason("but it was not").fail();
   * ```
   *
   * @see {@link ExpectMessageBuilder.reason | reason}, {@link ExpectMessageBuilder.fail | fail}
   */
  public failWithReason(reason: string) {
    return this.reason(reason).fail();
  }

  /**
   * Returns a {@link ExpectMessageBuilder.build | built} copy of this message, assuming
   * it passed and was NOT negated.
   *
   * @remarks
   * Primarily provided for debugging cases.
   *
   * @example
   * ```ts
   * return message.toString();
   *
   * // is the same as:
   * return message.build(true, false);
   * ```
   *
   * @see {@link ExpectMessageBuilder.build | build}
   */
  public toString(): string {
    return this.build();
  }

  /**
   * Creates an error message to display, based on the data attached to this instance.
   *
   * @remarks
   * This is the final method called, and is usually done by {@link expect} itself.
   *
   * This creates a string with all the relevant data attached and ready to be
   * thrown as an error.
   *
   * @param pass - Did the check {@link ExpectMessageBuilder.pass | pass}?
   * @param negated - Was the check {@link Assertion.not | negated}?
   *
   * @returns A string that can be output, rendered in the defined format and
   * with all data attached.
   */
  public build(pass: boolean = true, negated: boolean = false): string {
    const builder = new StringBuilder();

    this.buildPrefix(builder, pass, negated);
    this.buildOthers(builder, negated);
    builder.appendLine("");
    this.buildReason(builder);
    if (this.data.path !== undefined) {
      this.buildMetadata(builder, this.data.nestedMetadata);
    } else {
      this.buildMetadata(builder, this.data.surfaceMetadata);
    }

    if (!pass) this.buildMetadata(builder, this.data.failureMetadata);
    this.buildMetadata(builder, this.data.metadata);
    builder.appendLine("");
    this.buildVariableData(builder, "expected");
    this.buildVariableData(builder, "actual");
    // we build others twice incase of nested placeholders
    this.buildOthers(builder, negated);

    const response = builder.build();

    return this.options.trimWhiteSpace ? trim(response) : response;
  }

  /**
   * Encodes a `value` to a string, in the same way this instance would.
   *
   * @remarks
   * You won't generally need this, but it can come in handy when you need to display
   * extra values, and want to ensure their format is the same as the
   * {@link VariableData} attached to this message.
   *
   * Internally, this uses a local {@link https://www.lua.org/pil/17.html weak table} for
   * encoding. This means that you can safely re-call this method with the same value, but
   * different settings, and you won't take a performance hit for large objects.
   *
   * @param value - The value of variable to encode.
   * @param valueType - A string representing the type of the variable to encode. Defaults to the `typeOf` of the `value`.
   * @param overrideOptions - Provide overrides for the existing {@link ExpectMessageBuilder.options | options} on this instance.
   * @param array - Is the value an array? This is used for formatting purposes. Defaults to `false`.
   * @param collapsable - Should we collapse the value if it exceeds the `collapseLength`? Defaults to `false`.
   * @param collapseLength - Provide a length for when the string output should be collapsed. Defaults to the
   * {@link ExpectConfig.collapseLength | collapseLength} defined in the default config, at the time of the call.
   *
   * @returns A string that can be used in-place of the variable.
   *
   * @example
   * ```ts
   * print(message.encode(5, "string"))
   * ```
   * Output:
   * ```text
   * "5"
   * ```
   *
   * @see {@link ExpectConfig.collapsable}, {@link ExpectConfig.build | build}
   */
  public encode(
    value: unknown,
    valueType: string = typeOf(value),
    overrideOptions: Partial<ExpectMessageBuilderOptions> = {},
    array: boolean = false,
    collapsable: boolean = false,
    collapseLength: number = getDefaultExpectConfig().collapseLength
  ) {
    const result = this.tryToEncode(value);
    encodingCache.set(value as object, result);

    const options = {
      ...this.options,
      ...overrideOptions,
    };

    let transform = result;

    if (collapsable && transform.size() > collapseLength) {
      if (valueType === "table") {
        if (array) {
          transform = "[...]";
        } else {
          transform = "{...}";
        }
      } else if (valueType === "string") {
        transform = '"..."';
      } else {
        transform = "...";
      }
    }

    if (options.wrapValues) {
      if (valueType !== "string" && typeIs(value, "string")) {
        // meaning the user provided a string representation, but it should be shown as a 'value' instead of "value" (eg; enums)
        transform = `'${transform.sub(2, -2)}'`;
      } else {
        const wrapper = valueType === "string" ? "" : "'";
        transform = `${wrapper}${transform}${wrapper}`;
      }
    }

    return transform;
  }

  private tryToEncode(value: unknown) {
    const maybeEncoded = encodingCache.get(value as object);
    if (maybeEncoded !== undefined) return maybeEncoded;

    try {
      const result = HttpService.JSONEncode(value);
      if (result === "nil") return tostring(value);

      return result;
    } catch (e) {
      warn(e);
      return tostring(value);
    }
  }

  private buildPrefix(builder: StringBuilder, pass: boolean, negated: boolean) {
    const prefix = negated ? this.data.negationPrefix : this.data.prefix;
    const suffix = negated ? this.data.negationPrefix : this.data.suffix;

    builder.append(prefix ?? this.data.prefix);
    if (!pass) builder.append(this.data.trailingFailurePrefix ?? "");

    builder.append(suffix ?? this.data.suffix ?? "");
    if (!pass) builder.append(this.data.failureSuffix ?? "");

    if (negated) builder.append(this.data.negationSuffix ?? "");
  }

  private buildReason(builder: StringBuilder) {
    if (this.data.reason !== undefined) {
      if (builder.has(place.reason)) {
        builder.replace(place.reason, this.data.reason);
      } else {
        builder.appendLine(`Reason: ${this.data.reason}`);
      }
    } else {
      builder.remove(place.reason, this.options.trimSpaces);
    }
  }

  private buildMetadata(
    builder: StringBuilder,
    metadata: Record<string, unknown>
  ) {
    // sort the entries so that index, key, and value are the first three lines
    const entries = Object.entries(metadata).sort((a, b) => {
      const keyA = a[0].lower();
      const keyB = b[0].lower();

      // TODO(): does math.huge === math.huge?
      const orderA = METADATA_SORT_ORDER[keyA] ?? math.huge;
      const orderB = METADATA_SORT_ORDER[keyB] ?? math.huge;

      return orderA === orderB ? keyA < keyB : orderA < orderB;
    });

    for (const [key, value] of entries) {
      builder.appendLine(`${key}: ${value}`);
    }
  }

  private buildVariableData(
    builder: StringBuilder,
    variable: "actual" | "expected"
  ) {
    const data = this.data[variable];
    const holders = place[variable];

    const valueType = data.type ?? typeOf(data.value);

    builder.replace(holders.type, valueType);
    if (data.value !== undefined) {
      const array = isArray(data.value);

      const collapsed = this.encode(data.value, data.type, {}, array, true);
      const full = this.encode(data.value, data.type, {}, array, false);

      builder.replace(holders.value, collapsed);
      builder.replace(holders.fullValue, full);

      if (this.options.attachFullOnCollapse && collapsed !== full) {
        builder.appendLine(`${capitalize(variable)} (full): ${full}`);
      }
    } else {
      builder.replace(holders.value, place.nil);
      builder.replace(holders.fullValue, place.nil);
    }
  }

  private replaceOrRemove(
    builder: StringBuilder,
    placeholder: string,
    value?: string | number
  ) {
    if (value !== undefined) {
      builder.replace(placeholder, tostring(value));
    } else {
      builder.remove(placeholder, this.options.trimSpaces);
    }
  }

  private buildOthers(builder: StringBuilder, negated: boolean) {
    this.replaceOrRemove(builder, place.path, this.data.path);
    this.replaceOrRemove(
      builder,
      place.name,
      this.data.path ?? this.data.name ?? place.actual.value
    );
    this.replaceOrRemove(builder, place.index, this.data.index);

    builder.replace(place.nil, "nil");

    if (negated) {
      builder.replace(place.not, "NOT");
    } else {
      builder.remove(place.not, this.options.trimSpaces);
    }
  }
}
