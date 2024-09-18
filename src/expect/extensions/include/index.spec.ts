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

/// <reference types="@rbxts/testez/globals" />

import { expect } from "@src/index";
import { withProxy } from "@src/util/proxy";
import { err, TEST_SON } from "@src/util/tests";

export = () => {
  describe("include", () => {
    it("checks if the value is in the array", () => {
      expect([1, 2, 3]).to.include(2).but.not.include(4);
    });
  });

  describe("error message", () => {
    it("throws if the value is missing", () => {
      err(() => {
        expect([1, 2]).to.include(3);
      }, `Expected '[1,2]' to include '3', but it was missing`);
    });

    it("works with paths", () => {
      err(
        () => {
          withProxy(TEST_SON, (proxy) => {
            expect(proxy.parent?.cars).to.include("Spaceship");
          });
        },
        'Expected parent.cars to include "Spaceship", but it was missing',
        `parent.cars: '["Tesla","Civic"]'`
      );
    });
  });
};
