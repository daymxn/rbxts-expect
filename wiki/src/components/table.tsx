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

import CodeBlock from "@theme/CodeBlock";
import React, { ReactNode } from "react";

const Entry: React.FC<{ old: string; new: string; children?: ReactNode }> = ({ old, new: newProp, children }) => {
  return (
    <tr>
      <td>
        <CodeBlock language="ts">{old}</CodeBlock>
      </td>
      <td>
        <CodeBlock language="ts">{newProp}</CodeBlock>
      </td>
      <td style={{ paddingBottom: "1rem" }}>{children}</td>
    </tr>
  );
};

const Table: React.FC = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>TestEZ</th>
          <th>@rbxts/expect</th>
          <th>Comments</th>
        </tr>
      </thead>
      <tbody>
        <Entry old={`expect(5).to.be.a("number")`} new={`expect(5).to.be.a.number()`}>
          There's also support for other common types.
        </Entry>
        <Entry
          old={`expect(newproxy(true)).to.be.a("userdata")`}
          new={`expect(newproxy(true)).to.be.an.instanceOf("userdata")`}
        >
          Can also use <a href="/docs/api/expect.assertion.typeof">typeOf</a>
        </Entry>
        <Entry
          old={`expect(new Instance()).to.be.an("Instance")`}
          new={`expect(new Instance()).to.be.a.typeOf("Instance")`}
        >
          Can also use <a href="/docs/api/expect.assertion.instanceof">instanceOf</a>
        </Entry>
      </tbody>
    </table>
  );
};

export default Table;
