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
  describe("array", () => {
    it("makes sure all keys are numbers", () => {
      expect([1, 2, 3]).to.be.an.array();

      expect({
        "1": 1,
        2: 2,
        3: 3,
      }).to.not.be.an.array();
    });

    it("makes sure keys are within bounds", () => {
      expect({
        1: 1,
        2: 2,
        3: 3,
      }).to.be.an.array();

      expect({
        0: 1,
        1: 2,
        2: 3,
      }).to.not.be.an.array();

      expect({
        1: 1,
        2: 2,
        4: 3,
      }).to.not.be.an.array();
    });

    it("makes sure there are no empty spaces", () => {
      expect({
        1: 1,
        2: undefined,
        3: 3,
      }).to.not.be.an.array();

      expect({
        4: 4,
        5: 5,
        6: 6,
      }).to.not.be.an.array();
    });

    it("passes for empty arrays", () => {
      expect([]).to.be.an.array();
    });

    it("makes sure the type is a table", () => {
      expect(undefined).to.not.be.an.array();
      expect("1").to.not.be.an.array();
    });
  });

  describe("arrayOf", () => {
    it("works with checkable types", () => {
      expect([new CFrame()]).to.be.an.arrayOf("CFrame").but.not.an.arrayOf("Vector3");

      expect([5, "5"]).to.be.an.array().but.not.an.arrayOf("number").or.an.arrayOf("string");
    });

    it("works with t types", () => {
      expect([new CFrame()]).to.be.an.arrayOf(t.CFrame).but.not.an.arrayOf(t.Vector3);

      expect([5, "5"]).to.be.an.array().but.not.an.arrayOf(t.number).or.an.arrayOf(t.string);

      expect([
        {
          name: "daymon",
          age: 100,
        },
      ]).to.be.an.arrayOf(
        t.interface({
          name: t.string,
          age: t.number,
        }),
      );
    });

    it("works with user defined callbacks", () => {
      expect([5])
        .to.be.an.arrayOf((value) => value === 5)
        .and.an.arrayOf(() => {})
        .but.not.an.arrayOf(() => false);
    });

    it("propogates user defined messages", () => {
      const message = "Value was not '5'.";
      expect(() => {
        expect([5]).to.be.an.arrayOf(() => {
          throw message;
        });
      }).to.throw(message);

      expect(() => {
        expect([5]).to.be.an.arrayOf(() => message);
      }).to.throw(message);
    });

    it("passes for empty arrays", () => {
      expect([]).to.be.an.arrayOf(t.string);
    });
  });

  describe("error message", () => {
    it("throws if it's a different type", () => {
      err(() => {
        expect(5).to.be.an.array();
      }, "Expected '5' to be an array, but it was a 'number'");

      err(() => {
        expect([5]).to.not.be.an.array();
      }, "Expected '[5]' to NOT be an array");
    });

    it("throws if there are non number keys", () => {
      err(() => {
        expect({
          "1": 1,
          2: 2,
          3: 3,
        }).to.be.an.array();
      }, "to be an array, but it had a non number key '1' (string)");
    });

    it("throws if there are out of bounds keys", () => {
      err(() => {
        expect({
          0: 1,
          2: 2,
          3: 3,
        }).to.be.an.array();
      }, "to be an array, but it had an out of bounds key '0'");

      err(() => {
        expect({
          1: 1,
          2: 2,
          4: 3,
        }).to.be.an.array();
      }, "to be an array, but it had an out of bounds key '4'. Are there holes in the array?");
    });

    it("throws if it's undefined", () => {
      err(() => {
        expect(undefined).to.be.an.array();
      }, "Expected nil to be an array, but it was undefined");
    });

    it("works with paths", () => {
      err(() => {
        withProxy(TEST_SON, (son) => {
          expect(son.parent?.data).to.be.an.array();
        });
      }, "Expected parent.data to be an array, but it had a non number key 'id' (string)");
    });

    it("throws if the elements are the wrong string type", () => {
      err(() => {
        expect([1]).to.be.an.arrayOf("string");
      }, "Expected '[1]' to be an array of type 'string', but there was an element that was a 'number'");
    });

    it("throws if the elements don't pass the t check", () => {
      err(
        () => {
          expect([1]).to.be.an.arrayOf(t.string);
        },
        "Expected '[1]' to be an array of a certain (user-defined) type, but there was an element that was not",
        "Index: 1",
        "Value: 1",
      );
    });

    it("throws if the elements don't pass the user-defined callback", () => {
      err(
        () => {
          expect([1]).to.be.an.arrayOf(() => "Nope!");
        },
        "Expected '[1]' to be an array of a certain (user-defined) type, but there was an element that was not",
        "Reason: Nope!",
      );
    });
  });
};
