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