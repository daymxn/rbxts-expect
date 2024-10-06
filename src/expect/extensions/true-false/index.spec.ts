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
  describe("true", () => {
    it("checks that the value is the boolean true", () => {
      expect(true).to.be.true();
      expect(false).to.not.be.true();

      expect(1).to.not.be.true();
    });
  });

  describe("false", () => {
    it("checks that the value is the boolean false", () => {
      expect(false).to.be.false();
      expect(true).to.not.be.false();

      expect(0).to.not.be.false();
    });
  });

  describe("truthy", () => {
    it("checks that the value is truthy according to luau", () => {
      expect(true).to.be.truthy();
      expect(false).to.not.be.truthy();

      expect(0).to.be.truthy();
      expect("").to.be.truthy();
    });
  });

  describe("falsy", () => {
    it("checks that the value is falsy according to luau", () => {
      expect(false).to.be.falsy();
      expect(true).to.not.be.falsy();

      expect(undefined).to.be.falsy();
    });
  });

  describe("error message", () => {
    it("throws when the value is not the expected boolean", () => {
      err(() => {
        expect(true).to.be.false();
      }, `Expected 'true' to be 'false'`);

      err(() => {
        expect(false).to.be.true();
      }, `Expected 'false' to be 'true'`);
    });

    it("throws when the value is not truthy or falsy", () => {
      err(() => {
        expect(100).to.be.falsy();
      }, `Expected '100' to be falsy, but it was not`);

      err(() => {
        expect(false).to.be.truthy();
      }, `Expected 'false' to be truthy, but it was not`);
    });

    it("throws when it's undefined", () => {
      err(() => {
        expect(undefined).to.be.true();
      }, `Expected the value to be 'true', but it was undefined`);

      err(() => {
        expect(undefined).to.be.false();
      }, `Expected the value to be 'false', but it was undefined`);

      err(() => {
        expect(undefined).to.be.truthy();
      }, `Expected the value to be truthy, but it was undefined`);
    });

    it("throws when it's not a boolean", () => {
      err(() => {
        expect(5).to.have.be.true();
      }, `Expected '5' (number) to be 'true', but it wasn't a boolean`);

      err(() => {
        expect(5).to.have.be.false();
      }, `Expected '5' (number) to be 'false', but it wasn't a boolean`);
    });

    it("works with paths", () => {
      err(
        () => {
          withProxy(TEST_SON, (son) => {
            expect(son.parent?.name).to.be.true();
          });
        },
        `Expected parent.name to be 'true', but it wasn't a boolean`,
        'parent.name: "Daymon"'
      );

      err(
        () => {
          withProxy(TEST_SON, (son) => {
            expect(son.parent?.name).to.be.false();
          });
        },
        `Expected parent.name to be 'false', but it wasn't a boolean`,
        'parent.name: "Daymon"'
      );

      err(() => {
        withProxy(TEST_SON, (son) => {
          expect(son.parent?.parent).to.be.truthy();
        });
      }, `Expected parent.parent to be truthy, but it was undefined`);

      err(
        () => {
          withProxy(TEST_SON, (son) => {
            expect(son.parent?.name).to.be.falsy();
          });
        },
        `Expected parent.name to be falsy, but it was not`,
        'parent.name: "Daymon"'
      );
    });
  });
};
