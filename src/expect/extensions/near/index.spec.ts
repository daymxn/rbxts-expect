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

const EPSILON = 2.220446049250313e-16;

export = () => {
  describe("near", () => {
    it("checks if the value is within a range", () => {
      expect(5 - EPSILON)
        .to.be.near(5)
        .and.closeTo(6, 2)
        .but.not.near(5 - 0.1)
        .or.closeTo(-5);
    });

    it("inclusively checks if the value is within a range", () => {
      expect(5).to.be.closeTo(5);
      expect(5.1).to.be.near(5, 0.1);
    });

    it("works with negative numbers", () => {
      expect(-5 + EPSILON).to.be.closeTo(-5);
    });
  });

  describe("error message", () => {
    it("throws when the value is too big", () => {
      err(() => {
        expect(1).to.be.near(0);
      }, "Expected '1' to be a number close to '0', but it was too high");
    });

    it("throws when the value is too small", () => {
      err(() => {
        expect(0).to.be.near(1);
      }, "Expected '0' to be a number close to '1', but it was too low");
    });

    it("throws when it's undefined", () => {
      err(() => {
        expect(undefined).to.be.near(1);
      }, "Expected the value to be a number close to '1', but it was undefined");
    });

    it("throws when it's not a number", () => {
      err(() => {
        expect("5").to.be.near(1);
      }, `Expected "5" (string) to be a number close to '1', but it wasn't a number`);
    });

    it("works with paths", () => {
      err(
        () => {
          withProxy(TEST_SON, (son) => {
            expect(son.parent?.age).to.be.near(25);
          });
        },
        `Expected parent.age to be a number close to '25', but it was too low`,
        `parent.age: '5'`
      );
    });
  });
};
