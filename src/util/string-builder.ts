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

/**
 * @internal
 */
export class StringBuilder {
  private value: string;
  constructor(initialValue?: string) {
    this.value = initialValue ?? "";
  }

  public append(text: string): this {
    this.value += text;
    return this;
  }

  public appendLine(text: string): this {
    this.value += `\n${text}`;

    return this;
  }

  public has(pattern: string): boolean {
    return !this.value.match(pattern).isEmpty();
  }

  public replace(match: string, replacement: string): this {
    this.value = this.value.gsub(match, tostring(replacement))[0];

    return this;
  }

  public remove(match: string, trimSpaces: boolean = false): this {
    if (trimSpaces) {
      // to replace matches that are the start of the line/sentence, are the end, and in the middle.
      // helps avoid creating white space if they're at the end
      this.replace(`%s${match}`, "").replace(`${match}%s*`, "");
    } else {
      this.replace(match, "");
    }

    return this;
  }

  public prepend(text: string): this {
    this.value = text + this.value;
    return this;
  }

  public clear(): this {
    this.value = "";
    return this;
  }

  public toString() {
    return this.value;
  }

  public build() {
    return this.value;
  }
}
