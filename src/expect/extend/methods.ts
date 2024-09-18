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

import { Result } from "@rbxts/rust-classes";
import { Assertion } from "@src/expect/types";
import { ExpectMessageBuilder } from "@src/message";

export type AssertMethodResult = Result<
  ExpectMessageBuilder,
  ExpectMessageBuilder
>;

export type CustomMethodImpl<T = unknown> = (
  source: Assertion<T>,
  actual: T,
  ...args: never[]
) => AssertMethodResult;

export type CustomMethodImpls<T> = {
  [key: string]: CustomMethodImpl<T>;
};

let assertionMethods: CustomMethodImpls<unknown> = {};

export function extendMethods(methods: CustomMethodImpls<never>) {
  assertionMethods = {
    ...assertionMethods,
    ...(methods as CustomMethodImpls<unknown>),
  };
}

export function getMethodExtensions(): Readonly<typeof assertionMethods> {
  return assertionMethods;
}
