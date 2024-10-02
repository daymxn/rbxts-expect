---
id: expect.variabledata
title: VariableData interface
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [VariableData](./expect.variabledata.md)

## VariableData interface

Data about the variables in an expect statement.

**Signature:**

```typescript
interface VariableData 
```

## Remarks

In practice, this is the `expect` and `actual` variables.

## Example


```ts
// Given:
expect(5).to.not.equal("5");
// This would be the variable data:
const expectVariable: VariableData = {
  value: "5",
  type: "string"
};

const actualVariable: VariableData = {
  value: 5,
  type: "number"
}
```

## Properties

<table><thead><tr><th>

Property


</th><th>

Modifiers


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[type?](./expect.variabledata.type.md)


</td><td>


</td><td>

string


</td><td>

_(Optional)_ The type of this variable, as a string.


</td></tr>
<tr><td>

[value](./expect.variabledata.value.md)


</td><td>


</td><td>

unknown


</td><td>

The value of this variable.


</td></tr>
</tbody></table>