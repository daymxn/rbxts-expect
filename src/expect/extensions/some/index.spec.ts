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

import { startsWith } from "@rbxts/string-utils";
import { expect } from "@src/index";
import { withProxy } from "@src/util/proxy";
import { err, TEST_SON } from "@src/util/tests";

export = () => {
  describe("some", () => {
    it("checks if the array has some element", () => {
      expect([1, 2, 3])
        .to.have.some((it) => it === 2)
        .but.not.some((it) => it === 4);

      expect([1, 2, 3])
        .to.have.some("equals two", (it) => it === 2)
        .but.not.some("equals four", (it) => it === 4);
    });
  });

  describe("error message", () => {
    it("throws if the check fails", () => {
      err(() => {
        expect([1, 2]).to.have.some((it) => it === 3);
      }, `Expected '[1,2]' to have at least one element that passes some check`);

      err(
        () => {
          expect([1, 2]).to.not.have.some((it) => it === 2);
        },
        `Expected '[1,2]' to NOT have any elements that passes some check, but it did at index '2'`,
        "Value of [2]: '2'"
      );
    });

    it("throws if the check fails, with the provided reason", () => {
      err(() => {
        expect([1, 2]).to.have.some("equals 3", (it) => it === 3);
      }, `Expected '[1,2]' to have at least one element that equals 3`);

      err(
        () => {
          expect([1, 2]).to.not.have.some("equal 2", (it) => it === 2);
        },
        `Expected '[1,2]' to NOT have any elements that equal 2, but it did at index '2'`,
        "Value of [2]: '2'"
      );
    });

    it("throws if the value is undefined", () => {
      err(() => {
        expect(undefined as unknown as unknown[]).to.have.some(() => true);
      }, `Expected the value to have at least one element that passes some check, but it was undefined`);

      err(() => {
        expect(undefined as unknown as unknown[]).to.have.some(
          "likes pizza",
          () => true
        );
      }, `Expected the value to have at least one element that likes pizza, but it was undefined`);
    });

    it("throws if the value is not an array", () => {
      err(() => {
        expect(5 as unknown as unknown[]).to.have.some(() => true);
      }, `Expected '5' to have at least one element that passes some check, but it wasn't an array`);

      err(() => {
        expect(5 as unknown as unknown[]).to.have.some(
          "likes pizza",
          () => true
        );
      }, `Expected '5' to have at least one element that likes pizza, but it wasn't an array`);
    });

    it("works with paths", () => {
      err(
        () => {
          withProxy(TEST_SON, (proxy) => {
            expect(proxy.parent?.cars).to.have.some(() => false);
          });
        },
        "Expected parent.cars to have at least one element that passes some check",
        `parent.cars: '["Tesla","Civic"]'`
      );

      err(
        () => {
          withProxy(TEST_SON, (proxy) => {
            expect(proxy.parent?.cars).to.not.have.some(
              `start with "Civ"`,
              (it) => startsWith(it, "Civ")
            );
          });
        },
        `Expected parent.cars to NOT have any elements that start with "Civ", but it did at index '2'`,
        `parent.cars: '["Tesla","Civic"]'`,
        `Value of [2]: "Civic"`
      );
    });
  });
};
