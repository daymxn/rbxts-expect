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

import { CustomMethodImpl, extendMethods } from "@src/expect/extend";
import { ExpectMessageBuilder } from "@src/message";
import { place } from "@src/message/placeholders";

const baseMessage = new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} strictly equal ${place.expected.value} (${place.expected.type})`
)
  .name(`${place.actual.value} (${place.actual.type})`)
  .nestedMetadata({
    [place.path]: `${place.actual.value} (${place.actual.type})`,
  });

const equal: CustomMethodImpl<defined> = (
  _,
  actual: defined,
  expected: defined
) => {
  const message = baseMessage.use().expectedValue(expected);

  return actual === expected ? message.pass() : message.fail();
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    eq<R = T>(expectedValue: R): Assertion<R>;
    equal<R = T>(expectedValue: R): Assertion<R>;
    equals<R = T>(expectedValue: R): Assertion<R>;
  }
}

extendMethods({
  eq: equal,
  equal: equal,
  equals: equal,
});
