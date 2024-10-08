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
  describe("all", () => {
    it("checks if all the array elements pass", () => {
      expect([1, 2, 3])
        .to.all((it) => typeIs(it, "number"))
        .but.not.all((it) => it % 2 === 0);

      expect([1, 2, 3])
        .to.all("be numbers", (it) => typeIs(it, "number"))
        .but.not.all("be even", (it) => it % 2 === 0);
    });
  });

  describe("error message", () => {
    it("throws if the check fails", () => {
      err(
        () => {
          expect([1, 2]).to.all((it) => it === 1);
        },
        `Expected '[1,2]' to all pass some check, but there was an element that failed the check`,
        "Index: 2",
        "Value: '2"
      );

      err(() => {
        expect([1, 1]).to.not.all((it) => it === 1);
      }, `Expected '[1,1]' to NOT all pass some check, but they did`);
    });

    it("throws if the check fails, with the provided reason", () => {
      err(
        () => {
          expect([1, 2]).to.all("equal 1", (it) => it === 1);
        },
        `Expected '[1,2]' to all equal 1, but there was an element that failed the check`,
        "Index: 2",
        "Value: '2"
      );

      err(() => {
        expect([1, 1]).to.not.all("equal 1", (it) => it === 1);
      }, `Expected '[1,1]' to NOT all equal 1, but they did`);
    });

    it("throws if the value is undefined", () => {
      err(() => {
        expect(undefined as unknown as unknown[]).to.all(() => true);
      }, `Expected the values to all pass some check, but it was undefined`);

      err(() => {
        expect(undefined as unknown as unknown[]).to.all(
          "like pizza",
          () => true
        );
      }, `Expected the values to all like pizza, but it was undefined`);
    });

    it("throws if the value is not an array", () => {
      err(() => {
        expect(5 as unknown as unknown[]).to.all(() => true);
      }, `Expected '5' to all pass some check, but it wasn't an array`);

      err(() => {
        expect(5 as unknown as unknown[]).to.all("like pizza", () => true);
      }, `Expected '5' to all like pizza, but it wasn't an array`);
    });

    it("works with paths", () => {
      err(
        () => {
          withProxy(TEST_SON, (proxy) => {
            expect(proxy.parent?.cars).to.all(() => false);
          });
        },
        "Expected parent.cars to all pass some check, but there was an element that failed the check",
        `parent.cars: '["Tesla","Civic"]'`,
        "Index: 1",
        `Value: "Tesla"`
      );

      err(
        () => {
          withProxy(TEST_SON, (proxy) => {
            expect(proxy.parent?.cars).to.all(`start with "Civ"`, (it) =>
              startsWith(it, "Civ")
            );
          });
        },
        `Expected parent.cars to all start with "Civ", but there was an element that failed the check`,
        `parent.cars: '["Tesla","Civic"]'`,
        "Index: 1",
        `Value: "Tesla"`
      );
    });
  });
};
