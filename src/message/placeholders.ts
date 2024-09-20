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

import { escape } from "@src/util/string";

function placeholder(name: string) {
  return escape(`{__rbxtsexpect_${name}}`);
}

export const Placeholder = {
  actual: {
    value: placeholder("actual_value"),
    fullValue: placeholder("full_actual_value"),
    type: placeholder("actual_type"),
  },
  expected: {
    value: placeholder("expected_value"),
    fullValue: placeholder("full_expected_value"),
    type: placeholder("expected_type"),
  },
  not: placeholder("not"),
  reason: placeholder("reason"),
  path: placeholder("path"),
  name: placeholder("name"),
  undefined: placeholder("nil"),
  nil: placeholder("nil"),
  index: placeholder("index"),
};

export const place = Placeholder;
