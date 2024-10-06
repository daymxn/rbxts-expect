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
  describe("startWith", () => {
    it("checks if arrays start with the given elements", () => {
      expect([1, 2, 3]).to.startWith([1, 2]).but.not.startWith([2, 3]);
    });

    it("checks if strings start with the given characters ", () => {
      expect("12345").to.startWith("123").but.not.startWith("345");
    });

    it("works with empty values", () => {
      expect([]).to.startWith([]);
      expect("").to.startWith("");
    });
  });

  describe("error message", () => {
    it("throws if the array doesn't have all of the elements", () => {
      err(() => {
        expect([1, 2]).to.startWith([2, 3]);
      }, `Expected '[1,2]' to be an array that starts with '[2,3]', but it was missing all of them`);
    });

    it("throws if the string doesn't have all of the elements", () => {
      err(() => {
        expect("day").to.startWith("mon");
      }, `Expected "day" to be a string that starts with "mon", but it was missing`);
    });

    it("throws if the string doesn't have some of the elements", () => {
      err(() => {
        expect("day").to.startWith("daym");
      }, `Expected "day" to be a string that starts with "daym", but it was missing`);
    });

    it("throws if the array is missing one of the elements", () => {
      err(() => {
        expect([1, 2]).to.startWith([0, 2]);
      }, `Expected '[1,2]' to be an array that starts with '[0,2]', but it was missing '0'`);
    });

    it("throws if the array is missing multiple elements", () => {
      err(
        () => {
          expect([1, 2, 3]).to.startWith([1, 4, 5]);
        },
        `Expected '[1,2,3]' to be an array that starts with '[1,4,5]', but it was missing 2 elements`,
        `Missing: '[4,5]'`
      );
    });

    it("throws if the type isn't a string", () => {
      err(() => {
        expect([1, 2]).to.startWith("day");
      }, `Expected '[1,2]' (table) to be a string that starts with "day", but it wasn't a string`);
    });

    it("throws if the type isn't an array", () => {
      err(() => {
        expect("day" as never as number[]).to.startWith([1]);
      }, `Expected "day" (string) to be an array that starts with '[1]', but it wasn't an array`);
    });

    it("throws if the type is undefined", () => {
      err(() => {
        expect(undefined).to.startWith("day");
      }, `Expected the value to be a string that starts with "day", but it was undefined`);

      err(() => {
        expect(undefined as never as number[]).to.startWith([1]);
      }, `Expected the value to be an array that starts with '[1]', but it was undefined`);
    });

    it("works with paths", () => {
      err(
        () => {
          withProxy(TEST_SON, (proxy) => {
            expect(proxy.parent?.cars).to.startWith(["Civic"]);
          });
        },
        `Expected parent.cars to be an array that starts with '["Civic"]', but it was missing all of them`,
        `parent.cars: '["Tesla","Civic"]'`
      );

      err(
        () => {
          withProxy(TEST_SON, (proxy) => {
            expect(proxy.parent?.name).to.startWith("Bry");
          });
        },
        `Expected parent.name to be a string that starts with "Bry", but it was missing`,
        `parent.name: "Daymon"`
      );
    });
  });
};
