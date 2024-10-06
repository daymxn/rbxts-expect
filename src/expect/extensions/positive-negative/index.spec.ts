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
  describe("positive", () => {
    it("checks if the value is greater than zero", () => {
      expect(5).to.be.positive();
    });

    it("fails when zero", () => {
      expect(0).to.not.be.positive();
    });
  });

  describe("negative", () => {
    it("checks if the value is less than zero", () => {
      expect(-5).to.be.negative();
    });

    it("fails when zero", () => {
      expect(0).to.not.be.negative();
    });
  });

  describe("error message", () => {
    it("throws when the check fails", () => {
      err(() => {
        expect(-1).to.be.positive();
      }, "Expected '-1' to be a positive number, but it was negative");

      err(() => {
        expect(1).to.be.negative();
      }, "Expected '1' to be a negative number, but it was positive");
    });

    it("throws when it's zero", () => {
      err(() => {
        expect(0).to.be.positive();
      }, "Expected '0' to be a positive number, but it was neutral");

      err(() => {
        expect(0).to.be.negative();
      }, "Expected '0' to be a negative number, but it was neutral");
    });

    it("throws when it's undefined", () => {
      err(() => {
        expect(undefined).to.be.positive();
      }, "Expected the value to be a positive number, but it was undefined");

      err(() => {
        expect(undefined).to.be.negative();
      }, "Expected the value to be a negative number, but it was undefined");
    });

    it("throws when it's not a number", () => {
      err(() => {
        expect("5").to.be.positive();
      }, `Expected "5" (string) to be a positive number, but it wasn't a number`);

      err(() => {
        expect("5").to.be.negative();
      }, `Expected "5" (string) to be a negative number, but it wasn't a number`);
    });

    it("works with paths", () => {
      err(
        () => {
          withProxy(TEST_SON, (son) => {
            expect(son.parent?.age).to.be.negative();
          });
        },
        `Expected parent.age to be a negative number, but it was positive`,
        `parent.age: '5'`
      );

      err(
        () => {
          withProxy(TEST_SON, (son) => {
            expect(son.parent?.age).to.not.be.positive();
          });
        },
        `Expected parent.age to NOT be a positive number, but it was`,
        `parent.age: '5'`
      );
    });
  });
};
