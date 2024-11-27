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
  describe("greaterThan", () => {
    it("checks if the actual value is greater than the expected number", () => {
      expect(5).to.be.greaterThan(4).and.gt(3).but.not.above(6);
    });
  });

  describe("greaterThanOrEqualTo", () => {
    it("checks if the actual value is greater than or equal to the expected number", () => {
      expect(5).to.be.greaterThanOrEqualTo(4).and.gte(5).but.not.at.least(6);
    });
  });

  describe("lessThan", () => {
    it("checks if the actual value is less than the expected number", () => {
      expect(5).to.be.lessThan(6).and.lt(7).but.not.below(4);
    });
  });

  describe("lessThanOrEqualTo", () => {
    it("checks if the actual value is less than or equal to the expected number", () => {
      expect(5).to.be.lessThanOrEqualTo(5).and.lte(6).but.not.at.most(4);
    });
  });

  describe("error message", () => {
    it("throws when the check fails", () => {
      err(() => {
        expect(1).to.be.greaterThan(2);
      }, "Expected '1' to be greater than '2'");

      err(() => {
        expect(1).to.be.gte(1).and.gte(2);
      }, "Expected '1' to be greater than or equal to '2'");

      err(() => {
        expect(2).to.be.lessThan(1);
      }, "Expected '2' to be less than '1'");

      err(() => {
        expect(2).to.be.lte(2).and.lte(1);
      }, "Expected '2' to be less than or equal to '1'");
    });

    it("throws when it's undefined", () => {
      err(() => {
        expect(undefined).to.be.greaterThan(2);
      }, "Expected the value to be greater than '2', but it was undefined");

      err(() => {
        expect(undefined).to.be.gte(2);
      }, "Expected the value to be greater than or equal to '2', but it was undefined");

      err(() => {
        expect(undefined).to.be.lessThan(1);
      }, "Expected the value to be less than '1', but it was undefined");

      err(() => {
        expect(undefined).to.be.lte(1);
      }, "Expected the value to be less than or equal to '1', but it was undefined");
    });

    it("throws when it's not a number", () => {
      err(() => {
        expect("5").to.be.greaterThan(2);
      }, `Expected "5" (string) to be greater than '2', but it wasn't a number`);

      err(() => {
        expect("5").to.be.gte(2);
      }, `Expected "5" (string) to be greater than or equal to '2', but it wasn't a number`);

      err(() => {
        expect("5").to.be.lessThan(1);
      }, `Expected "5" (string) to be less than '1', but it wasn't a number`);

      err(() => {
        expect("5").to.be.lte(1);
      }, `Expected "5" (string) to be less than or equal to '1', but it wasn't a number`);
    });

    it("works with paths", () => {
      err(
        () => {
          withProxy(TEST_SON, (son) => {
            expect(son.parent?.age).to.be.greaterThan(10);
          });
        },
        `Expected parent.age to be greater than '10'`,
        `parent.age: '5'`,
      );

      err(
        () => {
          withProxy(TEST_SON, (son) => {
            expect(son.parent?.age).to.be.greaterThanOrEqualTo(10);
          });
        },
        `Expected parent.age to be greater than or equal to '10'`,
        `parent.age: '5'`,
      );

      err(
        () => {
          withProxy(TEST_SON, (son) => {
            expect(son.parent?.age).to.be.lessThan(1);
          });
        },
        `Expected parent.age to be less than '1'`,
        `parent.age: '5'`,
      );

      err(
        () => {
          withProxy(TEST_SON, (son) => {
            expect(son.parent?.age).to.be.lessThanOrEqualTo(1);
          });
        },
        `Expected parent.age to be less than or equal to '1'`,
        `parent.age: '5'`,
      );
    });
  });
};
