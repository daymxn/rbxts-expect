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

import Object from "@rbxts/object-utils";
import { t } from "@rbxts/t";

/**
 * @internal
 */
export function mapObjectValues<T extends object>(
  object: T,
  callback: (value: NonNullable<T[keyof T]>) => unknown
): T {
  const mapped = Object.entries(object).map(([key, value]) => [
    key,
    callback(value as never),
  ]);

  return Object.fromEntries(mapped as never) as T;
}

/**
 * @internal
 */
export function isArray(element: unknown): element is defined[] {
  return t.array(t.any)(element);
}

/**
 * @internal
 */
export function getIndexOrNull(element: unknown, index: number) {
  try {
    return (element as defined[])[index];
  } catch (e) {
    return undefined;
  }
}
