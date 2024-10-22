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
  SKIP();
  describe("empty", () => {
    it("checks if arrays have any elements", () => {
      expect([]).to.be.empty();
      expect([1]).to.not.be.empty();
    });

    it("checks if strings have any characters", () => {
      expect("").to.be.empty();
      expect("Daymon").to.not.be.empty();
    });

    it("checks if objects have any keys", () => {
      expect({}).to.be.empty();
      expect(TEST_SON).to.not.be.empty();
    });
  });

  describe("error message", () => {
    it("throws if the array has elements", () => {
      err(() => {
        expect([1]).to.be.empty();
      }, `Expected '[1]' to be empty, but it had an element`);

      err(() => {
        expect([1, 2]).to.be.empty();
      }, `Expected '[1,2]' to be empty, but it had 2 elements`);
    });

    it("throws if the object has keys", () => {
      err(
        () => {
          expect({
            name: "Daymon",
          }).to.be.empty();
        },
        `Expected the object to be empty, but it had the key 'name'`,
        `Value of [name]: "Daymon"`
      );

      err(
        () => {
          expect({
            name: "Daymon",
            age: 5,
          }).to.be.empty();
        },
        `Expected the object to be empty, but it had 2 keys`,
        `Value:`
      );
    });

    it("throws if the string has characters", () => {
      err(() => {
        expect("Daymon").to.be.empty();
      }, `Expected "Daymon" to be empty, but it was not`);
    });

    it("throws if the type isn't an iterable or string", () => {
      err(() => {
        expect(5).to.be.empty();
      }, `Expected '5' to be empty, but it was not a 'string' or iterable type. Instead, it was a 'number'`);
    });

    it("throws if the type is undefined", () => {
      err(() => {
        expect(undefined).to.be.empty();
      }, `Expected nil to be empty, but it was undefined`);
    });

    it("works with paths", () => {
      err(
        () => {
          withProxy(TEST_SON, (proxy) => {
            expect(proxy.parent?.cars).to.be.empty();
          });
        },
        "Expected parent.cars to be empty, but it had 2 elements",
        `parent.cars: '["Tesla","Civic"]'`
      );
    });
  });
};
