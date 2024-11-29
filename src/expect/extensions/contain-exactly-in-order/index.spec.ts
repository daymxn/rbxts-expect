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
  describe("containExactlyInOrder", () => {
    it("checks if two arrays contain the same values, and in the same order", () => {
      expect([1, 2, 3])
        .to.containExactlyInOrder([1, 2, 3])
        .but.not.containExactlyInOrder([1, 2, 3, 4])
        .or.containExactlyInOrder([1, 2])
        .or.containExactlyInOrder([1, 3, 2]);
    });

    it("does deep comparisons", () => {
      expect([new Vector3(1, 2, 3), new Vector3(3, 2, 1)]).to.containExactlyInOrder([
        new Vector3(1, 2, 3),
        new Vector3(3, 2, 1),
      ]);
    });
  });

  describe("error message", () => {
    it("throws if there are elements missing", () => {
      err(
        () => {
          expect([1, 2]).to.containExactlyInOrder([1, 2, 3]);
        },
        `Expected '[1,2]' to contain exactly '[1,2,3]', but it was missing elements`,
        "Missing elements: '[3]'",
      );
    });

    it("throws if there are extra elements", () => {
      err(
        () => {
          expect([1, 2, 3]).to.containExactlyInOrder([1, 2]);
        },
        `Expected '[1,2,3]' to contain exactly '[1,2]', but it had an extra element`,
        "Extra element: '3'",
      );
    });

    it("throws if the elements have different values", () => {
      err(
        () => {
          expect([1, 2, 3]).to.containExactlyInOrder([1, 3, 2]);
        },
        `Expected '[1,2,3]' to contain exactly '[1,3,2]', but it had a different value for the element at '[1]'`,
        "Actual [1]: '2'",
        "Expected [1]: '3'",
      );
    });

    it("throws if the elements have different types", () => {
      err(
        () => {
          expect([1, "2", 3]).to.containExactlyInOrder([1, 2, 3]);
        },
        `Expected '[1,"2",3]' to contain exactly '[1,2,3]', but it had a different type of element at '[1]`,
        `Actual [1]: "2" (string)`,
        `Expected [1]: '2' (number)`,
      );
    });

    it("throws if the elements have different reference values", () => {
      err(
        () => {
          expect([1, new Instance("Part"), 3]).to.containExactlyInOrder([1, new Instance("Part"), 3]);
        },
        `Expected '[1,null,3]' to contain exactly '[1,null,3]', but it had a different reference for the element at '[1]' (Instance)`,
        "Actual [1]: 'Part'",
        "Expected [1]: 'Part'",
      );
    });

    it("throws if the value is undefined", () => {
      err(() => {
        expect(undefined as unknown as unknown[]).to.containExactlyInOrder([1]);
      }, `Expected the value to contain exactly '[1]', but it was undefined`);
    });

    it("throws if the value is not an array", () => {
      err(() => {
        expect(5 as unknown as unknown[]).to.containExactlyInOrder([1]);
      }, `Expected '5' (number) to contain exactly '[1]', but it wasn't an array`);
    });

    it("works with paths", () => {
      err(
        () => {
          withProxy(TEST_SON, (proxy) => {
            expect(proxy.parent?.cars).to.containExactlyInOrder(["Tesla"]);
          });
        },
        `Expected parent.cars to contain exactly '["Tesla"]', but it had an extra element`,
        `parent.cars: '["Tesla","Civic"]'`,
        `Extra element: "Civic"`,
      );
    });
  });
};
