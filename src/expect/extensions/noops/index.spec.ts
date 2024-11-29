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

export = () => {
  describe("noop", () => {
    it("return the source instance", () => {
      const source = expect(5);
      expect(source.to).to.shallowEqual(source.be);
    });

    it("all work", () => {
      expect(5).to.the.and.be.been.is.an.a.or.of.that.which.does.still.also.but.have.shallowEqual(5);
    });
  });
};
