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

import { deepCopy } from "@rbxts/object-utils";
import { expect } from "@src/index";
import { withProxy } from "@src/util/proxy";
import { err, TEST_SON } from "@src/util/tests";

enum NormalEnum {
  First,
  Second,
  Third,
}

enum StringEnum {
  FirstStr = "FirstStr",
  SecondStr = "SecondStr",
  ThirdStr = "ThirdStr",
}

export = () => {
  describe("enum", () => {
    it("checks if the value is of the enum type", () => {
      expect(NormalEnum.First).to.be.enum(NormalEnum);
      expect(5).to.not.be.enum(NormalEnum);

      expect(StringEnum.FirstStr).to.be.enum(StringEnum);
      expect("FiveStr").to.not.be.enum(StringEnum);
    });

    it("checks if the value is a certain enum value", () => {
      expect(NormalEnum.First).to.be.enum(NormalEnum, NormalEnum.First);
      expect(NormalEnum.First).to.not.be.enum(NormalEnum, NormalEnum.Second);

      expect(StringEnum.FirstStr).to.be.enum(StringEnum, StringEnum.FirstStr);
      expect(StringEnum.FirstStr).to.not.be.enum(StringEnum, StringEnum.SecondStr);
    });
  });

  describe("error message", () => {
    it("throws if it's not a valid enum", () => {
      err(() => {
        expect(5).to.be.enum(NormalEnum);
      }, "Expected '5' (number) to be a valid enum of '(First | Second | Third)'");
    });

    it("throws if it's undefined", () => {
      err(() => {
        expect().to.be.enum(NormalEnum);
      }, "Expected the value to be a valid enum of '(First | Second | Third)', but it was undefined");

      err(() => {
        expect().to.be.enum(NormalEnum, NormalEnum.Second);
      }, "Expected the value to be the enum 'Second', but it was undefined");
    });

    it("throws if it's the wrong enum", () => {
      err(() => {
        expect(NormalEnum.First).to.be.enum(NormalEnum, NormalEnum.Second);
      }, "Expected 'First' (enum/number) to be the enum 'Second'");

      err(() => {
        expect(5).to.be.enum(NormalEnum, NormalEnum.Second);
      }, "Expected '5' (number) to be the enum 'Second'");
    });

    it("works with paths", () => {
      err(
        () => {
          const person = deepCopy(TEST_SON);
          person.parent!["data"] = NormalEnum.First;

          withProxy(person, (proxy) => {
            expect(proxy.parent?.data).to.be.enum(NormalEnum, NormalEnum.Second);
          });
        },
        "Expected parent.data to be the enum 'Second'",
        "parent.data: 'First' (enum/number)",
      );
    });
  });
};
