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

// type InferArrayElement<T> = T extends (infer U)[] ? U : never;

// type TypeChecker<T> = (value: T) => boolean;

// export interface Assertion<T> {
//     readonly to: Assertion<T>;
//     readonly be: Assertion<T>;
//     readonly an: Assertion<T>; // only use I can think of is to.be.an.instanceOf
//     readonly not: Assertion<T>;
//     readonly never: Assertion<T>;
//     readonly have: Assertion<InferArrayElement<T>>;

//     a<I>(checker: TypeChecker<I>): asserts this is I; // maybe make this a noop too?
//     a<I>(name: string): asserts this is I;
//     a<I>(tChecker: t.static<T>): asserts this is I;

//     // instanceOf<I>(checker: TypeChecker<I>): asserts this is I;
//     // instanceOf<I>(name: string): asserts this is I;
//     // instanceOf<I>(tChecker: t.static<T>): asserts this is I;

//     truthy(): Assertion<T>;
//     falsy(): Assertion<T>;

//     true(): asserts this is true;
//     false(): asserts this is false;

//     equal(other: T): Assertion<T>;
//     deepEqual(other: T): Assertion<T>;
//     shallowEqual(other: T): Assertion<T>;

//     undefined(): asserts this is undefined;
//     null(): asserts this is undefined;
//     nil(): asserts this is undefined;

//     ok(): asserts this is defined; // do we need a NegativeAssertion type to fix this? like for `to.never.be.ok()` should be `asserts this is undefined`

//     anyOf(values: unknown[]): Assertion<T>; // to.be.equal() to any of values

//     property<K extends string, V = unknown>(name: K): asserts this is T & { [P in K]: V }
//     property(name: string): Assertion<T>;

//     match(obj: unknown): Assertion<T>; // object mapper thing where the values present on other need to be present on ours and be equal
//     match<K>(obj: K): asserts this is T & K;

//     matchExactly(obj: unknown): Assertion<T>; // no extra keys
//     matchExactly<K>(obj: K): asserts this is K;
// }

// interface ArrayAssertion<T> extends Assertion<T[]> {
//     // to.have.a.negative() ? (any value is negative)
//     // to.have.true()

//     containInOrder(values: T[]): ArrayAssertion<T>; // ignore extras

//     containExactlyInOrder(values: T[]): ArrayAssertion<T>;

//     sorted(): ArrayAssertion<T>;

//     sortedBy(sortFunc: (first: T, second: T) => boolean): ArrayAssertion<T>;

//     containExactly(values: T[]): ArrayAssertion<T>;
//     contain(value: T): ArrayAssertion<T>;

//     allOf(other: T): ArrayAssertion<T>; // all are this element
//     allOf(others: T[]): ArrayAssertion<T>; // contains other aray

//     any(filter: (value: T) => boolean): ArrayAssertion<T>;
//     any(other: T[]): ArrayAssertion<T>;
//     any(): ArrayAssertion<T>; // is not empty

//     noneOf(filter: (value: T) => boolean): ArrayAssertion<T>;
//     noneOf(other: T[]): ArrayAssertion<T>;

//     some(filter: (value: T) => boolean): ArrayAssertion<T>;
//     some(other: T[]): ArrayAssertion<T>;
//     some(): ArrayAssertion<T>; // is not empty

//     oneOf(filter: (value: T) => boolean): ArrayAssertion<T>;
//     oneOf(other: T[]): ArrayAssertion<T>;

//     one(): ArrayAssertion<T>;
//     singleElement(): ArrayAssertion<T>;
//     size(size: number): ArrayAssertion<T>;

//     include(values: T[]): ArrayAssertion<T>;
//     include(value: T): ArrayAssertion<T>;

//     startWith(value: T): ArrayAssertion<T>;
//     startWith(values: T[]): ArrayAssertion<T>;

//     endWith(value: T): ArrayAssertion<T>;
//     endWith(values: T[]): ArrayAssertion<T>;

//     empty(): ArrayAssertion<T>;
//     none(): ArrayAssertion<T>;

//     unique(): ArrayAssertion<T>;
//     containNoDuplicates(): ArrayAssertion<T>; // or to.never.containDuplicates()
// }

// interface StringAssertion extends Assertion<string> {
//     blank(): StringAssertion;
//     empty(): StringAssertion;

//     pattern(regex: string): StringAssertion;
//     match(regex: string): StringAssertion;

//     startWith(value: string): StringAssertion
//     endWith(value: string): StringAssertion;
// }

// interface NumberAssertion extends Assertion<number> {
//     one(): asserts this is 1;
//     zero(): asserts this is 0;

//     greaterThan(value: number): NumberAssertion;
//     lessThan(value: number): NumberAssertion;

//     greaterOrEqualTo(value: number): NumberAssertion;
//     lessOrEqualTo(value: number): NumberAssertion;

//     equal(value: number): NumberAssertion;

//     negative(): NumberAssertion;
//     positive(): NumberAssertion;

//     even(): NumberAssertion;
//     odd(): NumberAssertion;

//     between(min: number, max: number): NumberAssertion;
// }

// interface PromiseAssertion<T> extends Assertion<Promise<T>> {
//     complete(): PromiseAssertion<T>;
//     fail(): PromiseAssertion<T>;
//     cancel(): PromiseAssertion<T>;

//     completeWith(value: T): T;

//     failWith(errorMessage: string): PromiseAssertion<T>;
//     throw(): PromiseAssertion<T>;
//     throw(message: string): PromiseAssertion<T>;
//     throwWith(message: string): PromiseAssertion<T>;
// }
