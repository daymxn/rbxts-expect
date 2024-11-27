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

const SPECIAL_CHARS = ["$", "%", "^", "*", "(", ")", ".", "[", "]", "+", "-", "?"];
const SPECIAL_CHARS_PATTERN = `[${SPECIAL_CHARS.map((it) => `%${it}`).join("")}]`;

/**
 * @internal
 */
export function escape(str: string) {
  return str.gsub(SPECIAL_CHARS_PATTERN, "%%%0")[0];
}

/**
 * @internal
 */
export function matches(str: string, pattern: string) {
  return !str.match(pattern).isEmpty();
}

/**
 * @internal
 */
export function capitalize(str: string) {
  return str.gsub("^%l", string.upper)[0];
}
