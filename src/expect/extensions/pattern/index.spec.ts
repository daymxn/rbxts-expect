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
  describe("pattern", () => {
    it("looks for a string pattern in the string", () => {
      expect("My Name").to.have.the.pattern("^%a").but.not.have.the.pattern("^$l");
    });
  });

  describe("error message", () => {
    it("throws when a match isn't found", () => {
      err(() => {
        expect("Hello world").to.have.the.pattern("^Goodbye");
      }, 'Expected "Hello world" to have a match for the pattern /^Goodbye/, but it was missing');
    });

    it("outputs the matches when negated", () => {
      err(
        () => {
          expect("Hello World").to.not.have.the.pattern("%u%l");
        },
        'Expected "Hello World" to NOT have a match for the pattern /%u%l/, but it did',
        'Match: "He"',
      );
    });

    it("throws when it's undefined", () => {
      err(() => {
        expect(undefined).to.have.the.pattern("Goodbye");
      }, "Expected the value to have a match for the pattern /Goodbye/, but it was undefined");
    });

    it("throws when it's not a string", () => {
      err(() => {
        expect(5).to.have.the.pattern("Goodbye");
      }, `Expected '5' (number) to have a match for the pattern /Goodbye/, but it wasn't a string`);
    });

    it("works with paths", () => {
      err(
        () => {
          withProxy(TEST_SON, (son) => {
            expect(son.parent?.name).to.have.the.pattern("^%l");
          });
        },
        "Expected parent.name to have a match for the pattern /^%l/, but it was missing",
        'parent.name: "Daymon"',
      );
    });
  });
};
