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

import type { Assertion } from "@rbxts/expect";
import { includes } from "@rbxts/string-utils";
import type { ExpectMessageBuilder } from "@src/message";

/**
 * @internal
 */
export interface Person {
  name: string;
  age: number;
  cars: string[];
  parent?: Person;
  data?: unknown;
}

/**
 * @internal
 */
export const TEST_PARENT: Person = {
  name: "Daymon",
  age: 5,
  cars: ["Tesla", "Civic"],
  data: {
    id: 1,
  },
};

/**
 * @internal
 */
export const TEST_SON: Person = {
  name: "Kyle",
  age: 4,
  cars: [],
  parent: TEST_PARENT,
};

/**
 * Helper function for testing {@link ExpectMessageBuilder | expect error messages}.
 *
 * Throws an error if the `callback` doesn't throw.
 *
 * @remarks
 * Intended to be used in test (`.spec.ts`) files.
 *
 * Used internally for testing {@link Assertion.throw | throw} and other error messages,
 * so that internal issues don't cause tests to accidentally pass.
 *
 * @param callback - The function to wrap around.
 * @param messages - A variable amount of substrings to look for in the message.
 *
 * @example
 * Testing for errors:
 * ```ts
 * err(() => {
 *   expect([1]).to.be.empty();
 * });
 * ```
 * Output:
 * ```text
 * The function did not throw a message.
 * ```
 *
 * @example
 * Testing for certain errors:
 * ```ts
 * err(() => {
 *   expect([1]).to.be.empty();
 * }, `Expected '[1]' to be empty, but it had an element`);
 * ```
 * Output if the string(s) weren't found in the error:
 * ```text
 * The function threw with the wrong message.
 *
 *   Expected Message:
 *   Expected '[1]' to be empty, but it had an element
 *
 *   Actual Message:
 *   Expected '[1]' to be empty, but it had the element '1'
 * ```
 * Output if the function didn't throw at all:
 * ```text
 * The function did not throw a message.
 *
 *   Expected Messages:
 *   Expected '[1]' to be empty, but it had an element
 * ```
 *
 * @example
 * Testing for multiple substrings:
 * ```ts
 * err(() => {
 *   expect([1]).to.be.empty();
 * }, "to be empty", "but it had an element");
 * ```
 *
 * If it doesn't find any of the provided substrings, it will
 * throw with that specific substring:
 * ```text
 * The function threw with the wrong message.
 *
 *   Expected Message:
 *   "but it had an element"
 *
 *   Actual Message:
 *   Expected '[1]' to be empty, but it had the element '1'
 * ```
 *
 * @public
 */
export function err(callback: () => unknown, ...messages: string[]) {
  try {
    callback();

    throw `The function did not throw a message.
  
  Expected Messages:
  ${messages.join("\n")}
`;
  } catch (e) {
    const m = e as string;
    for (const message of messages) {
      if (!includes(m, message)) {
        throw `The function threw with the wrong message.

  Expected Message:
  ${message}
      
  Actual Message:
  ${m}
      `;
      }
    }
  }
}
