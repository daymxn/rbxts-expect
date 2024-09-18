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
  `Expected ${place.name} to ${place.not} include ${place.expected.value}`
)
  .failureSuffix(", but it was missing")
  .nestedMetadata({
    [place.path]: place.actual.value,
  });

const include: CustomMethodImpl<defined[]> = (
  _,
  actual: defined[],
  expectedValue: defined
) => {
  const message = baseMessage.use().expectedValue(expectedValue);

  return actual.includes(expectedValue) ? message.pass() : message.fail();
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    include(expectedValue: InferArrayElement<T>): this;
    includes(expectedValue: InferArrayElement<T>): this;
  }
}

extendMethods({
  include: include,
  includes: include,
});
