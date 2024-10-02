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
import { err, TEST_PARENT, TEST_SON } from "@src/util/tests";

export = () => {
  describe("deepEqual", () => {
    it("works with arrays", () => {
      expect([1, 2, 3]).to.deepEqual([1, 2, 3]);
      expect([1, 2]).to.not.deepEqual([1, 2, 3]);
    });

    it("works with objects", () => {
      expect(TEST_SON).to.deepEqual(TEST_SON).but.not.deepEqual(TEST_PARENT);
    });

    it("works with roblox types", () => {
      expect(new Vector3(1, 2, 3)).to.deepEqual(new Vector3(1, 2, 3));
      expect(new CFrame())
        .to.deepEqual(new CFrame())
        .but.not.deepEqual(new Vector3());

      const instance = new Instance("Part");

      expect(instance).to.deepEqual(instance);
    });

    it("works with primitives", () => {
      expect(5).to.deepEqual(5);
      expect("Daymon").to.deepEqual("Daymon");
    });

    it("works with proxies", () => {
      withProxy(TEST_SON, (son) => {
        expect(son).to.deepEqual(TEST_SON).but.not.deepEqual(TEST_PARENT);
      });
    });
  });

  describe("error message", () => {
    it("throws if they have different types", () => {
      err(
        () => {
          expect(5).to.deepEqual("5");
        },
        `Expected '5' to deep equal "5", but they have different types`,
        'Expected: "5" (string)',
        "Actual: '5' (number)"
      );
    });

    it("throws if table paths have different types", () => {
      err(
        () => {
          expect({
            name: "Daymon",
            age: 5,
          }).to.deepEqual({
            name: "Daymon",
            age: "5",
          });
        },
        `Expected '{...}' to deep equal '{...}', but 'age' has a different type`,
        'Expected: "5" (string)',
        "Actual: '5' (number)",
        `Expected (full):`,
        "Actual (full):"
      );
    });

    it("throws if they have different values", () => {
      err(
        () => {
          expect(5).to.deepEqual(4);
        },
        `Expected '5' to deep equal '4', but they have different values`,
        "Expected: '4' (number)",
        "Actual: '5' (number)"
      );
    });

    it("throws if table paths have different values", () => {
      err(
        () => {
          expect({
            name: "Daymon",
            age: 5,
          }).to.deepEqual({
            name: "Daymon",
            age: 4,
          });
        },
        `Expected '{...}' to deep equal '{...}', but 'age' has a different value`,
        "Expected: '4' (number)",
        "Actual: '5' (number)",
        `Expected (full):`,
        "Actual (full):"
      );
    });

    it("throws if they have different values by reference", () => {
      err(() => {
        expect(new Instance("Part")).to.deepEqual(new Instance("Part"));
      }, `Expected 'null' to deep equal 'null', but they point to different values of reference type 'Instance'`);
    });

    it("throws if table paths have different values by reference", () => {
      err(
        () => {
          expect({
            name: "Daymon",
            car: new Instance("Part"),
          }).to.deepEqual({
            name: "Daymon",
            car: new Instance("Part"),
          });
        },
        `Expected '{...}' to deep equal '{...}', but 'car' points to a different value of reference type 'Instance'`,
        `Expected (full):`,
        "Actual (full):"
      );
    });

    it("throws if there are elements missing from the array", () => {
      err(
        () => {
          expect([1, 2, 3]).to.deepEqual([1, 2, 3, 4]);
        },
        `Expected '[1,2,3]' to deep equal '[1,2,3,4]', but there were elements missing`,
        "Expected: '[1,2,3,4]'",
        "Actual: '[1,2,3]'",
        "Missing: '[4]'"
      );
    });

    it("throws if there are elements missing from arrays in tables", () => {
      err(
        () => {
          expect({
            name: "Daymon",
            cars: ["Tesla"],
          }).to.deepEqual({
            name: "Daymon",
            cars: ["Tesla", "Civic"],
          });
        },
        `Expected '{...}' to deep equal '{...}', but 'cars' was missing some elements`,
        `Expected: '["Tesla","Civic"]'`,
        `Actual: '["Tesla"]'`,
        `Missing: '["Civic"]'`,
        `Expected (full):`,
        "Actual (full):"
      );
    });

    it("throws if there are extra elements in the array", () => {
      err(
        () => {
          expect([1, 2]).to.deepEqual([1]);
        },
        `Expected '[1,2]' to deep equal '[1]', but there were extra elements`,
        "Expected: '[1]'",
        "Actual: '[1,2]'",
        "Extra Elements: '[2]'"
      );
    });

    it("throws if there are extra elements in arrays within tables", () => {
      err(
        () => {
          expect({
            name: "Daymon",
            cars: ["Tesla", "Civic"],
          }).to.deepEqual({
            name: "Daymon",
            cars: ["Tesla"],
          });
        },
        `Expected '{...}' to deep equal '{...}', but 'cars' had extra elements`,
        `Expected: '["Tesla"]'`,
        `Actual: '["Tesla","Civic"]'`,
        `Extra Elements: '["Civic"]'`,
        `Expected (full):`,
        "Actual (full):"
      );
    });

    it("throws if there's keys missing", () => {
      err(
        () => {
          expect({
            name: "Daymon",
          }).to.deepEqual({
            name: "Daymon",
            age: "5",
          });
        },
        `Expected '{"name":"Daymon"}' to deep equal '{...}', but 'age' was missing`,
        'Expected: "5" (string)',
        "Expected (full):"
      );
    });

    it("throws if there's extra keys", () => {
      err(
        () => {
          expect({
            name: "Daymon",
            age: "5",
          }).to.deepEqual({
            name: "Daymon",
          });
        },
        `Expected '{...}' to deep equal '{"name":"Daymon"}', but it had the extra key 'age'`,
        'age: "5" (string)',
        "Actual (full):"
      );
    });

    it("works with proxy paths", () => {
      err(
        () => {
          const son = deepCopy(TEST_SON);
          (son.parent!.data as Record<string, unknown>)["extra"] = 6;

          withProxy(son, (proxy) => {
            expect(proxy.parent).to.deepEqual(TEST_PARENT);
          });
        },
        `Expected parent to deep equal`,
        `but it had the extra key 'data.extra'`,
        "data.extra: '6' (number)"
      );
    });
  });
};
