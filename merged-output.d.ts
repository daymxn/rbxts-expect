import { t } from '@rbxts/t';
import { Result } from '@rbxts/rust-classes';
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
type EnumValue<E> = E[keyof E];
type Proxy<T> = T & ProxyInstance<T>;
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
declare function expect<T>(value: T): Assertion<T>;
declare class ExpectMessageBuilder {
    protected data: ExpectMessageData;
    options: ExpectMessageBuilderOptions;
    constructor(prefix?: string, negationPrefix?: string, options?: Partial<ExpectMessageBuilderOptions>);
    copy(): ExpectMessageBuilder;
    use(trailingPrefix?: string, trailingFailurePrefix?: string): ExpectMessageBuilder;
    appendPrefix(str: string): this;
    suffix(str?: string): this;
    negationSuffix(str?: string): this;
    failureSuffix(str?: string): this;
    trailingFailurePrefix(str?: string): this;
    name(value?: unknown): this;
    path(str?: string): this;
    metadata(data: Record<string, unknown>): this;
    failureMetadata(data: Record<string, unknown>): this;
    nestedMetadata(data: Record<string, unknown>): this;
    reason(reason?: string): this;
    expectedValue(value?: unknown): this;
    expectedType(typeStr?: string): this;
    expected(data: VariableData): this;
    actualValue(value?: unknown): this;
    actualType(typeStr?: string): this;
    actual(data: VariableData): this;
    index(index?: number | string): this;
    pass(): Result<ExpectMessageBuilder, ExpectMessageBuilder>;
    fail(): Result<ExpectMessageBuilder, ExpectMessageBuilder>;
    failWithReason(reason: string): Result<ExpectMessageBuilder, ExpectMessageBuilder>;
    toString(): string;
    build(pass?: boolean, negated?: boolean): string;
    private buildPrefix;
    private buildReason;
    private buildMetadata;
    private buildVariableData;
    private replaceOrRemove;
    private buildOthers;
}
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
type AssertMethodResult = Result<ExpectMessageBuilder, ExpectMessageBuilder>;
type CustomMethodImpl<T = unknown> = (source: Assertion<T>, actual: T, ...args: never[]) => AssertMethodResult;
type CustomMethodImpls<T> = {
    [key: string]: CustomMethodImpl<T>;
};
declare function extendMethods(methods: CustomMethodImpls<never>): void;
export { type Assertion, ExpectMessageBuilder, expect, extendMethods };

interface Assertion<T> {
    /**
     * Does thing
     * @param values
     */
    anyOf<R>(values: R[]): Assertion<R>;
    /**
     * Does some stuff
     */
    array(): Assertion<T extends unknown[] ? T : T[]>;
    array<I extends keyof CheckableTypes>(typeName: I): Assertion<I[]>;
    array<I>(checker: TypeChecker<I>): Assertion<I[]>;
    array<I>(tChecker: t.check<I>): Assertion<I[]>;
    arrayOf<I extends keyof CheckableTypes>(typeName: I): Assertion<I[]>;
    arrayOf<I>(checker: TypeChecker<I>): Assertion<I[]>;
    arrayOf<I>(tChecker: t.check<I>): Assertion<I[]>;
    empty: T extends string | Iterable<unknown> ? () => this : never;
    _enumType?: Record<number, string>;
    enum<R>(enumType: R & Record<number, string>): Assertion<EnumValue<R>>;
    enum<R>(enumType: R & Record<number, string>): Assertion<EnumValue<R>>;
    enum<R>(enumType: R & Record<number, string>, value: R[keyof R]): Assertion<EnumValue<R>>;
    enum<R>(enumType: R & Record<number, string>, value: keyof R): Assertion<EnumValue<R>>;
    eq<R = T>(expectedValue: R): Assertion<R>;
    equal<R = T>(expectedValue: R): Assertion<R>;
    equals<R = T>(expectedValue: R): Assertion<R>;
    include(expectedValue: InferArrayElement<T>): this;
    includes(expectedValue: InferArrayElement<T>): this;
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
    readonly not: this;
    readonly never: this;
    readonly to: this;
    readonly the: this;
    readonly and: this;
    readonly be: this;
    readonly been: this;
    readonly is: this;
    readonly an: this;
    readonly a: this;
    readonly or: this;
    readonly of: this;
    readonly that: this;
    readonly which: this;
    readonly does: this;
    readonly still: this;
    readonly also: this;
    readonly but: this;
    readonly have: this;
    substring(str: string): Assertion<T>;
    throws(): Assertion<T>;
    throws(substring: string): Assertion<T>;
    throw(): Assertion<T>;
    throw(substring: string): Assertion<T>;
    throwsMatch(pattern: string): Assertion<T>;
    throwMatch(pattern: string): Assertion<T>;
    readonly value: T;
    _self: this;
    _negated: boolean;
    _proxy?: Proxy<T>;
}
interface ProxyInstance<T> {
    _is_proxy: true;
    _proxy_value: T;
    _proxy_parent?: Proxy<unknown>;
    _proxy_path?: string;
}
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
interface VariableData {
    value: unknown;
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
    failureMetadata: Record<string, unknown>;
    nestedMetadata: Record<string, unknown>;
    name?: unknown;
    path?: string;
}
interface ExpectMessageBuilderOptions {
    trimSpaces: boolean;
    wrapValuesInQuotes: boolean;
}
interface t {
    doStuff(): void;
}
