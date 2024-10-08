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

import { expect } from "@src/index";
import { withProxy } from "@src/util/proxy";
import { err, TEST_SON } from "@src/util/tests";

function isString(it: unknown) {
  return typeIs(it, "string");
}

export = () => {
  describe("satisfy", () => {
    it("passes when the callback returns true", () => {
      expect(5)
        .to.satisfy((it) => it === 5)
        .but.not.satisfy((it) => it === undefined);
    });
  });

  describe("error message", () => {
    it("throws if the callback returns false", () => {
      err(() => {
        expect(5).to.satisfy(() => false);
      }, `Expected '5' (number) to satisfy a given callback, but it didn't`);
    });

    it("uses named functions in the output", () => {
      err(() => {
        expect(5).to.satisfy(isString);
      }, `Expected '5' (number) to satisfy isString, but it didn't`);
    });

    it("works with paths", () => {
      err(
        () => {
          withProxy(TEST_SON, (proxy) => {
            expect(proxy.parent?.age).to.satisfy(() => false);
          });
        },
        `Expected parent.age to satisfy a given callback, but it didn't`,
        "parent.age: '5' (number)"
      );
    });
  });
};
