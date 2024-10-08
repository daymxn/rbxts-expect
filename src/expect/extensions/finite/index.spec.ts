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
  describe("finite", () => {
    it("checks if value is within math.huge", () => {
      expect(5).to.be.finite();
      expect(-5).to.be.finite();
      expect(0).to.be.finite();

      expect(math.huge).to.not.be.finite();
      expect(-math.huge).to.not.be.finite();
    });

    it("checks if value is a number", () => {
      expect("5").to.not.be.finite();
      expect(undefined).to.not.be.finite();
      expect([1, 2, 3]).to.not.be.finite();
    });
  });

  describe("error message", () => {
    it("throws when the check fails", () => {
      err(() => {
        expect(math.huge).to.be.finite();
      }, "Expected 'inf' to be a finite number, but it was 'math.huge'");

      err(() => {
        expect(-math.huge).to.be.finite();
      }, "Expected '-inf' to be a finite number, but it was '-math.huge'");
    });

    it("throws when it's undefined", () => {
      err(() => {
        expect(undefined).to.be.finite();
      }, "Expected the value to be a finite number, but it was undefined");
    });

    it("throws when it's not a number", () => {
      err(() => {
        expect("5").to.be.finite();
      }, `Expected "5" (string) to be a finite number, but it wasn't a number`);

      err(() => {
        expect("5").to.be.finite();
      }, `Expected "5" (string) to be a finite number, but it wasn't a number`);
    });

    it("works with paths", () => {
      err(
        () => {
          withProxy(TEST_SON, (son) => {
            expect(son.parent?.name).to.be.finite();
          });
        },
        `Expected parent.name to be a finite number, but it wasn't a number`,
        `parent.name: "Daymon"`
      );
    });
  });
};
