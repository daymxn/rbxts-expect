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

enum NormalEnum {
  First,
  Second,
  Third,
}

export = () => {
  describe("anyOf", () => {
    it("checks if the actual value is included in the array", () => {
      expect(5).to.be.anyOf([1, 2, 3, 4, 5]);
      expect(5).to.not.be.anyOf([1, 2, 3, 4]);
    });
  });

  describe("error message", () => {
    it("comes out as expected", () => {
      err(() => {
        expect(5).to.be.anyOf([1, 2, 3, 4]);
      }, "Expected '5' (number) to be any of '[1,2,3,4]'");

      err(() => {
        expect(5).to.not.be.anyOf([1, 2, 3, 4, 5]);
      }, "Expected '5' (number) to NOT be any of '[1,2,3,4,5]'");
    });

    it("throws if it's undefined", () => {
      err(() => {
        expect(undefined).to.be.anyOf([1, 2]);
      }, "Expected the value to be any of '[1,2]', but it was undefined");
    });

    it("works with paths", () => {
      err(() => {
        withProxy(TEST_SON, (p) => {
          expect(p.age).to.be.anyOf([1, 2, 3]);
        });
      }, "Expected age to be any of '[1,2,3]'");
    });

    it("uses enum values", () => {
      err(
        () => {
          expect(NormalEnum.First)
            .to.be.enum(NormalEnum)
            .that.is.anyOf([NormalEnum.Second, NormalEnum.Third]);
        },
        "Expected '%s' (enum/number) to be any of '%s'".format(
          "First",
          '["Second","Third"]'
        )
      );
    });
  });
};
