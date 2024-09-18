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

import { deepCopy } from "@rbxts/object-utils";
import { expect } from "@src/expect";
import { withProxy } from "@src/util/proxy";
import { err, TEST_SON } from "@src/util/tests";

function iThrow() {
  throw "Test Message";
}

function iDontThrow() {}

export = () => {
  describe("throw", () => {
    it("passes when the function throws", () => {
      expect(iThrow).to.throw();
      expect(() => {}).to.not.throw();
    });

    it("checks for substrings in error messages", () => {
      expect(iThrow).to.throw("Test");
      expect(iThrow).to.not.throw("Zebra");
    });

    it("checks for patterns in error messages", () => {
      expect(iThrow).to.throwMatch(".+");
      expect(iThrow).to.not.throwMatch("^Zebra");
    });

    it("should translate function names", () => {
      try {
        expect(iThrow).to.not.throw();

        throw "Expected the function to throw.";
      } catch (e) {
        expect(e).to.have.substring("Expected iThrow to");
      }
    });

    it("should handle anonymous functions", () => {
      try {
        expect(() => {}).to.throw();

        throw "Expected the function to throw.";
      } catch (e) {
        expect(e).to.have.substring("Expected the function to");
      }
    });
  });

  describe("error message", () => {
    it("translates the function name", () => {
      err(() => {
        expect(iDontThrow).to.throw();
      }, "Expected iDontThrow to throw, but it didn't throw at all");
    });

    it("propogates the error when it shouldn't have thrown", () => {
      err(
        () => {
          expect(iThrow).to.not.throw();
        },
        "Expected iThrow to NOT throw, but it did with the message:",
        "Test Message"
      );
    });

    it("handles anonymous functions", () => {
      err(() => {
        expect(() => {}).to.throw();
      }, "Expected the function to throw, but it didn't throw at all");
    });

    it("works with paths", () => {
      err(
        () => {
          const son = deepCopy(TEST_SON);
          son.parent!.data = iThrow;

          withProxy(son, (proxy) => {
            expect(proxy.parent?.data).to.not.throw();
          });
        },
        "Expected parent.data to NOT throw, but it did with the message:",
        "Test Message"
      );
    });

    it("throws if the error doesn't include the substring", () => {
      err(
        () => {
          expect(iThrow).to.throw("Your Message");
        },
        'Expected iThrow to throw with the substring "Your Message", but it threw a message without it:',
        "Test Message"
      );
    });

    it("throws if the error doesn't match the pattern", () => {
      err(
        () => {
          expect(iThrow).to.throwMatch("^Message");
        },
        "Expected iThrow to throw with a message that matched /^Message/, but it threw a message without it:",
        "Test Message"
      );
    });
  });
};
