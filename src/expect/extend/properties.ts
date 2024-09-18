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

import { Assertion } from "@src/expect/types";

export type CustomPropertyImpl<T = unknown> = (source: Assertion<T>) => unknown;

export type CustomPropertyImpls<T> = {
  [key: string]: CustomPropertyImpl<T>;
};

let assertionProperties: CustomPropertyImpls<unknown> = {};

export function extendProperties(properties: CustomPropertyImpls<never>) {
  assertionProperties = {
    ...assertionProperties,
    ...(properties as CustomPropertyImpls<unknown>),
  };
}

export function getPropertyExtensions(): Readonly<typeof assertionProperties> {
  return assertionProperties;
}
