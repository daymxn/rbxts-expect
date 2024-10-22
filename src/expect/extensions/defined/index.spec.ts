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
  describe("defined", () => {
    it("checks if value is not null", () => {
      expect("daymon")
        .to.be.ok()
        .and.to.be.defined()
        .and.to.exist()
        .and.also.exists();

      expect(undefined).to.not.be.ok();
    });
  });

  describe("undefined", () => {
    it("checks if value is null", () => {
      expect(undefined).to.be.undefined().and.to.be.null().and.to.nil();

      expect("Daymon").to.not.be.undefined();
    });
  });

  describe("error message", () => {
    it("throws when the check fails", () => {
      err(() => {
        expect("Daymon").to.be.undefined();
      }, `Expected "Daymon" (string) to be undefined, but it was defined`);

      err(() => {
        expect(undefined).to.be.ok();
      }, `Expected the value to be defined, but it was undefined`);
    });

    it("works with paths", () => {
      err(
        () => {
          withProxy(TEST_SON, (son) => {
            expect(son.parent?.age).to.be.undefined();
          });
        },
        `Expected parent.age to be undefined, but it was defined`,
        `parent.age: '5'FORCE_FAILURE_2`
      );

      err(
        () => {
          withProxy(TEST_SON, (son) => {
            expect(son.data).to.be.defined();
          });
        },
        `Expected data to be defined, but it was undefined`,
        `Actual: '{FORCE_FAILURE`
      );
    });
  });
};
