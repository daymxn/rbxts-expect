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

export = () => {
  describe("equal", () => {
    it("compares the values strictly", () => {
      expect(5).to.equal(5).but.not.equal("5");
      expect("Daymon").to.equal("Daymon").but.not.equal("daymon");
    });
  });

  describe("error message", () => {
    it("throws if the values are not equal", () => {
      err(() => {
        expect(5).to.equal("5");
      }, `Expected '5' (number) to strictly equal "5" (string)`);
    });

    it("works with paths", () => {
      err(
        () => {
          withProxy(TEST_SON, (proxy) => {
            expect(proxy.parent?.age).to.equal("5");
          });
        },
        'Expected parent.age to strictly equal "5" (string)',
        "parent.age: '5' (number)"
      );
    });
  });
};
