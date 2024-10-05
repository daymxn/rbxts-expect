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
  describe("even", () => {
    it("checks if value is divisible by two without a remainder", () => {
      for (const number of $range(1, 200)) {
        if (number % 2 === 0) {
          expect(number).to.be.even();
        } else {
          expect(number).to.not.be.even();
        }
      }
    });
  });

  describe("odd", () => {
    it("checks if value is NOT evenly divisible by two", () => {
      for (const number of $range(1, 200)) {
        if (number % 2 === 0) {
          expect(number).to.not.be.odd();
        } else {
          expect(number).to.be.odd();
        }
      }
    });
  });

  describe("error message", () => {
    it("throws when the check fails", () => {
      err(() => {
        expect(1).to.be.even();
      }, "Expected '1' to be even, but it was odd");

      err(() => {
        expect(2).to.be.odd();
      }, "Expected '2' to be odd, but it was even");
    });

    it("throws when it's undefined", () => {
      err(() => {
        expect(undefined).to.be.even();
      }, "Expected the value to be even, but it was undefined");

      err(() => {
        expect(undefined).to.be.odd();
      }, "Expected the value to be odd, but it was undefined");
    });

    it("throws when it's not a number", () => {
      err(() => {
        expect("5").to.be.even();
      }, `Expected "5" (string) to be even, but it wasn't a number`);

      err(() => {
        expect("5").to.be.odd();
      }, `Expected "5" (string) to be odd, but it wasn't a number`);
    });

    it("works with paths", () => {
      err(
        () => {
          withProxy(TEST_SON, (son) => {
            expect(son.parent?.age).to.be.even();
          });
        },
        `Expected parent.age to be even, but it was odd`,
        `parent.age: '5'`
      );

      err(
        () => {
          withProxy(TEST_SON, (son) => {
            expect(son.age).to.be.odd();
          });
        },
        `Expected age to be odd, but it was even`,
        `age: '4'`
      );
    });
  });
};
