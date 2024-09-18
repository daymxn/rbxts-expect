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
import { StringBuilder } from "@src/util/string-builder";
import { place } from "./placeholders";

export interface VariableData {
  value: unknown;
  type?: string;
}

export interface ExpectMessageData {
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
  name?: unknown;
  path?: string;
}

const METADATA_SORT_ORDER: Record<string, number> = {
  index: 1,
  key: 2,
  value: 3,
};

export interface ExpectMessageBuilderOptions {
  trimSpaces: boolean;
  wrapValuesInQuotes: boolean;
}

const defaultOptions: ExpectMessageBuilderOptions = {
  trimSpaces: true,
  wrapValuesInQuotes: true,
};

export class ExpectMessageBuilder {
  protected data: ExpectMessageData;

  public options: ExpectMessageBuilderOptions;

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

  public copy(): ExpectMessageBuilder {
    const newInstance = new ExpectMessageBuilder(
      this.data.prefix,
      this.data.negationPrefix,
      copy(this.options)
    );
    newInstance.data = deepCopy(this.data);

    return newInstance;
  }

  // TODO(): make it so you can't use any of the methods until you call `use`, to avoid accidentally using the baseMessage
  // this should be doable by having an interface for the constructor type or something
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

  public appendPrefix(str: string): this {
    this.data.prefix = `${this.data.prefix}${str}`;
    if (this.data.negationPrefix !== undefined) {
      this.data.negationPrefix = `${this.data.negationPrefix}${str}`;
    }

    return this;
  }

  public suffix(str?: string): this {
    this.data.suffix = str;

    return this;
  }

  public negationSuffix(str?: string): this {
    this.data.negationSuffix = str;

    return this;
  }

  public failureSuffix(str?: string): this {
    this.data.failureSuffix = str;

    return this;
  }

  public trailingFailurePrefix(str?: string): this {
    this.data.trailingFailurePrefix = str;

    return this;
  }

  // fallback if path is undefined
  public name(value?: unknown): this {
    this.data.name = value;

    return this;
  }

  public path(str?: string): this {
    this.data.path = str;

    return this;
  }

  // follows after the main message in a newline for each key value pair of key: value
  public metadata(data: Record<string, unknown>): this {
    this.data.metadata = {
      ...this.data.metadata,
      ...data,
    };

    return this;
  }

  public failureMetadata(data: Record<string, unknown>): this {
    this.data.failureMetadata = {
      ...this.data.failureMetadata,
      ...data,
    };

    return this;
  }

  // metadata that's only present when there's a path (ie; the assertion is nested)
  public nestedMetadata(data: Record<string, unknown>): this {
    this.data.nestedMetadata = {
      ...this.data.nestedMetadata,
      ...data,
    };

    return this;
  }

  // only if it's NOT nested
  public surfaceMetadata(data: Record<string, unknown>): this {
    this.data.surfaceMetadata = {
      ...this.data.surfaceMetadata,
      ...data,
    };

    return this;
  }

  public reason(reason?: string): this {
    this.data.reason = reason;

    return this;
  }

  public expectedValue(value?: unknown): this {
    this.data.expected.value = value;

    return this;
  }

  public expectedType(typeStr?: string): this {
    this.data.expected.type = typeStr;

    return this;
  }

  // overwrites the data completely
  public expected(data: VariableData): this {
    this.data.expected = data;

    return this;
  }

  public actualValue(value?: unknown): this {
    this.data.actual.value ??= value;

    return this;
  }

  public actualType(typeStr?: string): this {
    this.data.actual.type = typeStr;

    return this;
  }

  // overwrites the data completely
  public actual(data: VariableData): this {
    this.data.actual = data;

    return this;
  }

  public index(index?: number | string): this {
    this.data.index = index;

    return this;
  }

  public pass(): Result<ExpectMessageBuilder, ExpectMessageBuilder> {
    return Result.ok(this);
  }

  public fail(): Result<ExpectMessageBuilder, ExpectMessageBuilder> {
    return Result.err(this);
  }

  public failWithReason(reason: string) {
    return this.reason(reason).fail();
  }

  public toString(): string {
    return this.build();
  }

  public build(pass: boolean = true, negated: boolean = false): string {
    const builder = new StringBuilder();

    this.buildPrefix(builder, pass, negated);
    this.buildOthers(builder, negated);
    this.buildReason(builder);
    if (this.data.path !== undefined) {
      this.buildMetadata(builder, this.data.nestedMetadata);
    } else {
      this.buildMetadata(builder, this.data.surfaceMetadata);
    }

    if (!pass) this.buildMetadata(builder, this.data.failureMetadata);
    this.buildMetadata(builder, this.data.metadata);
    this.buildVariableData(builder, "actual");
    this.buildVariableData(builder, "expected");
    // we build others twice incase of nested placeholders
    this.buildOthers(builder, negated);

    return builder.build();
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
    if (data.value !== undefined && this.options.wrapValuesInQuotes) {
      const wrapper = valueType === "string" ? '"' : "'";

      builder.replace(holders.value, data.value, wrapper);
    } else {
      builder.replace(holders.value, data.value ?? place.nil);
    }
  }

  private replaceOrRemove(
    builder: StringBuilder,
    placeholder: string,
    value: unknown
  ) {
    if (value !== undefined) {
      builder.replace(placeholder, value);
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
