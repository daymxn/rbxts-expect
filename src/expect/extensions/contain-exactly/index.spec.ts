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
  describe("containExactly", () => {
    it("checks if two arrays contain the same values", () => {
      expect([1, 2, 3]).to.containExactly([1, 2, 3]).but.not.containExactly([1, 2, 3, 4]).or.containExactly([1, 2]);
    });

    it("doesn't care about order", () => {
      expect([1, 2, 3]).to.containExactly([2, 1, 3]);
    });

    it("does deep comparisons", () => {
      expect([new Vector3(1, 2, 3), new Vector3(3, 2, 1)]).to.containExactly([
        new Vector3(3, 2, 1),
        new Vector3(1, 2, 3),
      ]);
    });
  });

  describe("error message", () => {
    it("throws if there are elements missing", () => {
      err(
        () => {
          expect([1, 2]).to.containExactly([1, 2, 3]);
        },
        `Expected '[1,2]' to contain exactly '[1,2,3]', but it was missing elements`,
        "Missing elements: '[3]'",
      );
    });

    it("throws if there are extra elements", () => {
      err(
        () => {
          expect([1, 2, 3]).to.containExactly([1, 2]);
        },
        `Expected '[1,2,3]' to contain exactly '[1,2]', but it had extra elements`,
        "Extra elements: '[3]'",
      );
    });

    it("throws if there are missing and extra elements", () => {
      err(
        () => {
          expect([1, 2]).to.containExactly([1, 3]);
        },
        `Expected '[1,2]' to contain exactly '[1,3]', but it was elements missing and it had extra elements`,
        "Extra elements: '[2]'",
        "Missing elements: '[3]'",
      );
    });

    it("throws if the value is undefined", () => {
      err(() => {
        expect(undefined as unknown as unknown[]).to.containExactly([1]);
      }, `Expected the value to contain exactly '[1]', but it was undefined`);
    });

    it("throws if the value is not an array", () => {
      err(() => {
        expect(5 as unknown as unknown[]).to.containExactly([1]);
      }, `Expected '5' (number) to contain exactly '[1]', but it wasn't an array`);
    });

    it("works with paths", () => {
      err(
        () => {
          withProxy(TEST_SON, (proxy) => {
            expect(proxy.parent?.cars).to.containExactly(["Tesla"]);
          });
        },
        `Expected parent.cars to contain exactly '["Tesla"]', but it had extra elements`,
        `parent.cars: '["Tesla","Civic"]'`,
        `Extra elements: '["Civic"]'`,
      );
    });
  });
};
