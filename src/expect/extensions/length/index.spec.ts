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
  describe("length", () => {
    it("checks if arrays have the given amount of elements", () => {
      expect([1, 2, 3]).to.have.size(3).but.not.size(2);
    });

    it("checks if strings have the given amount of characters ", () => {
      expect("12345").to.have.size(5).but.not.size(4);
    });

    it("checks if objects have the given amount of keys", () => {
      expect({}).to.have.size(1);
      expect({
        name: "Daymon",
        age: 5,
      })
        .to.have.size(2)
        .but.not.size(1);
    });
  });

  describe("error message", () => {
    it("throws if the array has the wrong amount of elements", () => {
      err(() => {
        expect([1]).to.have.size(2);
      }, `Expected '[1]' to have exactly '2' element(s), but it actually had '1'`);

      err(() => {
        expect([1]).to.not.have.size(1);
      }, `Expected '[1]' to NOT have exactly '1' element(s), but it did`);
    });

    it("throws if the object has the wrong amount of keys", () => {
      err(
        () => {
          expect({
            name: "Daymon",
          }).to.have.size(2);
        },
        `Expected the object to have exactly '2' key(s), but it actually had '1'`,
        `Value:`
      );

      err(
        () => {
          expect({
            name: "Daymon",
          }).to.not.have.size(1);
        },
        `Expected the object to NOT have exactly '1' key(s), but it did`,
        `Value:`
      );
    });

    it("throws if the string has the wrong amount of characters", () => {
      err(() => {
        expect("123").to.have.size(2);
      }, `Expected "123" to have a size of exactly '2', but it actually had a size of '3'`);

      err(() => {
        expect("123").to.not.have.size(3);
      }, `Expected "123" to NOT have a size of exactly '3', but it did`);
    });

    it("throws if the type isn't an iterable or string", () => {
      err(() => {
        expect(5).to.have.size(1);
      }, `Expected '5' to have a size of '1', but it was not a 'string' or iterable type. Instead, it was a 'number'`);
    });

    it("throws if the type is undefined", () => {
      err(() => {
        expect(undefined).to.have.size(1);
      }, `Expected nil to have a size of '1', but it was undefined`);
    });

    it("works with paths", () => {
      err(
        () => {
          withProxy(TEST_SON, (proxy) => {
            expect(proxy.parent?.cars).to.have.size(3);
          });
        },
        "Expected parent.cars to have exactly '3' element(s), but it actually had '2'",
        `parent.cars: '["Tesla","Civic"]'`
      );
    });
  });
};
