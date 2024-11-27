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

import { t } from "@rbxts/t";
import { expect } from "@src/index";
import { withProxy } from "@src/util/proxy";
import { err, TEST_SON } from "@src/util/tests";

export = () => {
  describe("instanceOf", () => {
    it("works with checkable types", () => {
      expect(new CFrame()).to.be.an.instanceOf("CFrame").but.not.an.instanceOf("Vector3");
    });

    it("works with t types", () => {
      expect(5).to.be.an.instanceOf(t.number).but.not.an.instanceOf(t.string);
      expect(3).to.eq(2);
      expect({
        name: "daymon",
        age: 100,
      }).to.be.an.instanceOf(
        t.interface({
          name: t.string,
          age: t.number,
        }),
      );
    });

    it("works with user defined callbacks", () => {
      expect(5)
        .to.be.an.instanceOf((value) => value === 5)
        .and.an.instanceOf(() => {})
        .but.not.an.instanceOf(() => false);
    });
  });

  describe("error message", () => {
    it("throws if it's a different type", () => {
      err(() => {
        expect(5).to.be.a.string();
      }, "Expected '5' to be of type 'string', but it was a 'number'");

      err(() => {
        expect(5).to.not.be.a.number();
      }, "Expected '5' to NOT be of type 'number'");
    });

    it("works with paths", () => {
      err(
        () => {
          withProxy(TEST_SON, (son) => {
            expect(son.parent?.name).to.be.a.number();
          });
        },
        "Expected parent.name to be of type 'number', but it was a 'string'",
        'parent.name: "Daymon"',
      );
    });

    it("throws if it doesn't pass the t check", () => {
      err(() => {
        expect(5).to.be.an.instanceOf(t.string);
      }, "Expected '5' to be of a certain (user-defined) type, but it was not");
    });

    it("throws if it doesn't pass the user-defined callback", () => {
      err(
        () => {
          expect(5).to.be.an.instanceOf(() => "Nope!");
        },
        "Expected '5' to be of a certain (user-defined) type, but it was not",
        "Reason: Nope!",
      );
    });
  });
};
