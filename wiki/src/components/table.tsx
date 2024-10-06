import React, { ReactNode } from 'react';
import CodeBlock from '@theme/CodeBlock';

const Entry: React.FC<{ old: string, new: string, children?: ReactNode }> = ({ old, new: newProp, children }) => {
  return (
    <tr>
      <td>
        <CodeBlock language="ts">{old}</CodeBlock>
      </td>
      <td>
        <CodeBlock language="ts">{newProp}</CodeBlock>
      </td>
      <td style={{ paddingBottom: '1rem' }}>
        {children}
      </td>
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
        <Entry
          old={`expect(5).to.be.a("number")`}
          new={`expect(5).to.be.a.number()`}
        >
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
