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
  describe("endWith", () => {
    it("checks if arrays end with the given elements", () => {
      expect([1, 2, 3]).to.endWith([2, 3]).but.not.endWith([1, 2]);
    });

    it("checks if strings end with the given characters ", () => {
      expect("12345").to.endWith("345").but.not.endWith("123");
    });

    it("works with empty values", () => {
      expect([]).to.endWith([]);
      expect("").to.endWith("");
    });
  });

  describe("error message", () => {
    it("throws if the array doesn't have all of the elements", () => {
      err(() => {
        expect([1, 2]).to.endWith([2, 3]);
      }, `Expected '[1,2]' to be an array that ends with '[2,3]', but it was missing all of them`);
    });

    it("throws if the string doesn't have all of the elements", () => {
      err(() => {
        expect("day").to.endWith("mon");
      }, `Expected "day" to be a string that ends with "mon", but it was missing`);
    });

    it("throws if the string doesn't have some of the elements", () => {
      err(() => {
        expect("day").to.endWith("dy");
      }, `Expected "day" to be a string that ends with "dy", but it was missing`);
    });

    it("throws if the array is missing one of the elements", () => {
      err(() => {
        expect([1, 2]).to.endWith([0, 2]);
      }, `Expected '[1,2]' to be an array that ends with '[0,2]', but it was missing '0'`);
    });

    it("throws if the array is missing multiple elements", () => {
      err(
        () => {
          expect([1, 2, 3, 4]).to.endWith([1, 2, 4]);
        },
        `Expected '[1,2,3,4]' to be an array that ends with '[1,2,4]', but it was missing 2 elements`,
        `Missing: '[1,2]'`,
      );
    });

    it("throws if the type isn't a string", () => {
      err(() => {
        expect([1, 2]).to.endWith("day");
      }, `Expected '[1,2]' (table) to be a string that ends with "day", but it wasn't a string`);
    });

    it("throws if the type isn't an array", () => {
      err(() => {
        expect("day" as never as number[]).to.endWith([1]);
      }, `Expected "day" (string) to be an array that ends with '[1]', but it wasn't an array`);
    });

    it("throws if the type is undefined", () => {
      err(() => {
        expect().to.endWith("day");
      }, `Expected the value to be a string that ends with "day", but it was undefined`);

      err(() => {
        expect(undefined as never as number[]).to.endWith([1]);
      }, `Expected the value to be an array that ends with '[1]', but it was undefined`);
    });

    it("works with paths", () => {
      err(
        () => {
          withProxy(TEST_SON, (proxy) => {
            expect(proxy.parent?.cars).to.endWith(["Tesla"]);
          });
        },
        `Expected parent.cars to be an array that ends with '["Tesla"]', but it was missing all of them`,
        `parent.cars: '["Tesla","Civic"]'`,
      );

      err(
        () => {
          withProxy(TEST_SON, (proxy) => {
            expect(proxy.parent?.name).to.endWith("yle");
          });
        },
        `Expected parent.name to be a string that ends with "yle", but it was missing`,
        `parent.name: "Daymon"`,
      );
    });
  });
};
