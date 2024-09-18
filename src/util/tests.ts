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

import { includes } from "@rbxts/string-utils";

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
 * @internal
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
