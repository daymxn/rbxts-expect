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

import { extendNOPs } from "@src/expect/extend";

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * NOOP property for cleaner chaining; does nothing.
     *
     * @example
     * ```ts
     * expect(5).to.equal(5);
     * ```
     *
     * @public
     */
    readonly to: this;

    /**
     * NOOP property for cleaner chaining; does nothing.
     *
     * @example
     * ```ts
     * expect("Daymon").to.have.the.substring("Day");
     * ```
     *
     * @public
     */
    readonly the: this;

    /**
     * NOOP property for cleaner chaining; does nothing.
     *
     * @example
     * ```ts
     * expect([1,2]).to.include(1).and.include(2);
     * ```
     *
     * @public
     */
    readonly and: this;

    /**
     * NOOP property for cleaner chaining; does nothing.
     *
     * @example
     * ```ts
     * expect(1).to.be.oneOf([1,2,3]);
     * ```
     *
     * @public
     */
    readonly be: this;

    /**
     * NOOP property for cleaner chaining; does nothing.
     *
     * @example
     * ```ts
     * expect([]).to.have.been.empty();
     * ```
     *
     * @public
     */
    readonly been: this;

    /**
     * NOOP property for cleaner chaining; does nothing.
     *
     * @example
     * ```ts
     * expect([]).to.be.an.array().that.is.empty();
     * ```
     *
     * @public
     */
    readonly is: this;

    /**
     * NOOP property for cleaner chaining; does nothing.
     *
     * @example
     * ```ts
     * expect([1,2,3]).to.be.an.array();
     * ```
     *
     * @public
     */
    readonly an: this;

    /**
     * NOOP property for cleaner chaining; does nothing.
     *
     * @example
     * ```ts
     * expect("Daymon").to.be.a.string();
     * ```
     *
     * @public
     */
    readonly a: this;

    /**
     * NOOP property for cleaner chaining; does nothing.
     *
     * @example
     * ```ts
     * expect(1).to.not.be.a.string().or.a.table();
     * ```
     *
     * @public
     */
    readonly or: this;

    /**
     * NOOP property for cleaner chaining; does nothing.
     *
     * @example
     * ```ts
     * expect([1,2,3]).to.not.be.of.length(1);
     * ```
     *
     * @public
     */
    readonly of: this;

    /**
     * NOOP property for cleaner chaining; does nothing.
     *
     * @example
     * ```ts
     * expect([1,2,3]).to.be.an.array().that.includes(1);
     * ```
     *
     * @public
     */
    readonly that: this;

    /**
     * NOOP property for cleaner chaining; does nothing.
     *
     * @example
     * ```ts
     * expect([1,2,3]).to.be.an.array().which.includes(1);
     * ```
     *
     * @public
     */
    readonly which: this;

    /**
     * NOOP property for cleaner chaining; does nothing.
     *
     * @example
     * ```ts
     * expect([1,2,3]).to.be.an.array().that.does.not.include(4);
     * ```
     *
     * @public
     */
    readonly does: this;

    /**
     * NOOP property for cleaner chaining; does nothing.
     *
     * @example
     * ```ts
     * expect([1,2,3]).to.still.be.an.array();
     * ```
     *
     * @public
     */
    readonly still: this;

    /**
     * NOOP property for cleaner chaining; does nothing.
     *
     * @example
     * ```ts
     * expect([1,2,3]).to.include(1).but.also.include(2);
     * ```
     *
     * @public
     */
    readonly also: this;

    /**
     * NOOP property for cleaner chaining; does nothing.
     *
     * @example
     * ```ts
     * expect({ age: 5 }).to.be.a.table().but.not.an.array();
     * ```
     *
     * @public
     */
    readonly but: this;

    /**
     * NOOP property for cleaner chaining; does nothing.
     *
     * @example
     * ```ts
     * expect("Daymon").to.have.the.substring("Day");
     * ```
     *
     * @public
     */
    readonly have: this;
  }
}

extendNOPs([
  "to",
  "the",
  "and",
  "be",
  "been",
  "is",
  "an",
  "a",
  "that",
  "which",
  "does",
  "still",
  "also",
  "but",
  "of",
  "have",
  "or",
]);
