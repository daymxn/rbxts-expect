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
  describe("key", () => {
    it("looks for a key in the table", () => {
      expect({ name: "daymon" })
        .to.have.the.key("name")
        .and.the.property("name")
        .but.not.have.the.key("age");
    });
  });

  describe("error message", () => {
    it("throws when the key is missing", () => {
      err(
        () => {
          expect(TEST_SON).to.have.the.key("child");
        },
        `Expected '{...}' to have the key "child", but it was missing`,
        `Actual (full):`
      );
    });

    it("adds the key value on negation", () => {
      err(
        () => {
          expect(TEST_SON).to.not.have.the.key("name");
        },
        `Expected '{...}' to NOT have the key "name"`,
        `name: "Kyle"`,
        `Actual (full):`
      );
    });

    it("throws when it's undefined", () => {
      err(() => {
        expect(undefined).to.have.the.key("name");
      }, 'Expected the value to have the key "name", but it was undefined');
    });

    it("throws when it's not a table", () => {
      err(() => {
        expect(5).to.have.the.key("name");
      }, `Expected '5' (number) to have the key "name", but it wasn't a table`);
    });

    it("works with paths", () => {
      err(
        () => {
          withProxy(TEST_SON, (son) => {
            expect(son.parent).to.have.the.key("parent");
          });
        },
        'Expected parent to have the key "parent", but it was missing',
        "parent:"
      );
    });
  });
};
