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
  describe("between", () => {
    it("checks if the value is above a range", () => {
      expect(5).to.not.be.between(1, 2).or.within(2, 3);
    });

    it("checks if the value is below a range", () => {
      expect(5).to.not.be.between(6, 7).or.within(7, 10);
    });

    it("checks if the value is within a range", () => {
      expect(5).to.be.between(4, 6).and.within(1, 10);
    });

    it("inclusively checks if the value is within a range", () => {
      expect(5).to.be.between(5, 6);
      expect(5).to.be.between(5, 5);
    });

    it("works with negative numbers", () => {
      expect(-5).to.be.between(-10, -4);
    });
  });

  describe("error message", () => {
    it("throws when the value is too big", () => {
      err(() => {
        expect(5).to.be.between(1, 2);
      }, "Expected '5' to be a number between 1 and 2, but it was too high");
    });

    it("throws when the value is too small", () => {
      err(() => {
        expect(0).to.be.between(1, 2);
      }, "Expected '0' to be a number between 1 and 2, but it was too low");
    });

    it("throws when it's undefined", () => {
      err(() => {
        expect(undefined).to.be.between(1, 2);
      }, "Expected the value to be a number between 1 and 2, but it was undefined");
    });

    it("throws when it's not a number", () => {
      err(() => {
        expect("5").to.be.between(1, 2);
      }, `Expected "5" (string) to be a number between 1 and 2, but it wasn't a number`);
    });

    it("works with paths", () => {
      err(
        () => {
          withProxy(TEST_SON, (son) => {
            expect(son.parent?.age).to.be.between(25, 30);
          });
        },
        `Expected parent.age to be a number between 25 and 30, but it was too low`,
        `parent.age: '5'`,
      );
    });
  });
};
