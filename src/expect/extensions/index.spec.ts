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

import { expect } from "@src/expect";
import { err } from "@src/util";

export = () => {
  describe("expect", () => {
    it("should override error messages", () => {
      err(() => {
        expect(5, "Your mom").to.be.undefined();
      }, "Your mom");

      err(() => {
        expect(undefined, "Your mom").to.not.be.undefined();
      }, "Your mom");

      expect(5, "should not throw").to.be.defined();
      expect(undefined, "should not throw").to.not.be.defined();
    });
  });
};
