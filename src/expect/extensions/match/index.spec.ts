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

import { expect, resetDefaultExpectConfig, setDefaultExpectConfig } from "@src/index";
import { withProxy } from "@src/util/proxy";
import { err, TEST_SON } from "@src/util/tests";

export = () => {
  describe("matches", () => {
    it("works with objects", () => {
      expect(TEST_SON).to.match({ age: 4 }).but.not.match({ name: "Daymon" });
    });

    it("allows extra elements in tables", () => {
      expect({
        name: "Daymon",
        cars: ["Tesla", "Civic"],
      }).to.match({
        cars: ["Tesla"],
      });
    });

    it("allows extra keys", () => {
      expect({
        name: "Daymon",
        age: "5",
      }).to.match({
        name: "Daymon",
      });
    });
  });

  describe("error message", () => {
    beforeAll(() => {
      setDefaultExpectConfig({ collapseLength: 0 });
    });

    afterAll(() => {
      resetDefaultExpectConfig();
    });

    it("throws if table paths have different types", () => {
      err(
        () => {
          expect({
            name: "Daymon",
            age: 5,
          }).to.match({
            age: "5",
          });
        },
        `Expected '{...}' to match '{...}', but 'age' has a different type`,
        'Expected: "5" (string)',
        "Actual: '5' (number)",
        `Expected (full):`,
        "Actual (full):",
      );
    });

    it("throws if table paths have different values", () => {
      err(
        () => {
          expect({
            name: "Daymon",
            age: 5,
          }).to.match({
            age: 4,
          });
        },
        `Expected '{...}' to match '{...}', but 'age' has a different value`,
        "Expected: '4' (number)",
        "Actual: '5' (number)",
        `Expected (full):`,
        "Actual (full):",
      );
    });

    it("throws if table paths have different values by reference", () => {
      err(
        () => {
          expect({
            name: "Daymon",
            car: new Instance("Part"),
          }).to.match({
            car: new Instance("Part"),
          });
        },
        `Expected '{...}' to match '{...}', but 'car' points to a different value of reference type 'Instance'`,
        `Expected (full):`,
        "Actual (full):",
      );
    });

    it("throws if there are elements missing from arrays in tables", () => {
      err(
        () => {
          expect({
            name: "Daymon",
            cars: ["Tesla"],
          }).to.match({
            cars: ["Tesla", "Civic"],
          });
        },
        `Expected '{...}' to match '{...}', but 'cars' was missing some elements`,
        `Expected: '["Tesla","Civic"]'`,
        `Actual: '["Tesla"]'`,
        `Missing: '["Civic"]'`,
        `Expected (full):`,
        "Actual (full):",
      );
    });

    it("throws if there's keys missing", () => {
      err(
        () => {
          expect({
            name: "Daymon",
          }).to.match({
            name: "Daymon",
            age: "5",
          });
        },
        `Expected '{...}' to match '{...}', but 'age' was missing`,
        'Expected: "5" (string)',
        "Expected (full):",
      );
    });

    it("works with proxy paths", () => {
      err(
        () => {
          withProxy(TEST_SON, (proxy) => {
            expect(proxy.parent).to.match({ age: 20 });
          });
        },
        `Expected parent to match '{...}', but 'age' has a different value`,
        `Expected: '20' (number)`,
        "Actual: '5' (number)",
        "Expected (full):",
        "Actual (full):",
      );
    });
  });
};
