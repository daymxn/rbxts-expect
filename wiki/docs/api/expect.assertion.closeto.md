---
id: expect.assertion.closeto
title: Assertion.closeTo() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [closeTo](./expect.assertion.closeto.md)

## Assertion.closeTo() method

Asserts that the actual value is a number within epsilon of `value`<!-- -->.

**Signature:**

```typescript
closeTo(value: number): Assertion<number>;
```

## Parameters

<table><thead><tr><th>

Parameter


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

value


</td><td>

number


</td><td>

The number that the actual value should be within epsilon of.


</td></tr>
</tbody></table>
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;number&gt;

## Remarks

_Type alias for ._

## Example


```ts
const epsilon = 2.220446049250313e-16;
expect(10-epsilon).to.be.closeTo(10);
```
