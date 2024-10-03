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
  describe("substring", () => {
    it("looks for a string in the string", () => {
      expect("My Name")
        .to.have.the.substring("My")
        .but.not.have.the.substring("Your");
    });

    it("does not use patterns", () => {
      expect("My name").to.not.have.the.substring("%s");
    });
  });

  describe("error message", () => {
    it("throws when the string is missing", () => {
      err(() => {
        expect("Hello world").to.have.the.substring("Goodbye");
      }, 'Expected "Hello world" to have the substring "Goodbye"');
    });

    it("throws when it's undefined", () => {
      err(() => {
        expect(undefined).to.have.the.substring("Goodbye");
      }, 'Expected the value to have the substring "Goodbye", but it was undefined');
    });

    it("throws when it's not a string", () => {
      err(() => {
        expect(5).to.have.the.substring("Goodbye");
      }, `Expected '5' (number) to have the substring "Goodbye", but it wasn't a string`);
    });

    it("works with paths", () => {
      err(
        () => {
          withProxy(TEST_SON, (son) => {
            expect(son.parent?.name).to.have.the.substring("Bryan");
          });
        },
        'Expected parent.name to have the substring "Bryan"',
        'parent.name: "Daymon"'
      );
    });
  });
};
