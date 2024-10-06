---
id: expect.assertion.closeto_1
title: Assertion.closeTo() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [closeTo](./expect.assertion.closeto_1.md)

## Assertion.closeTo() method

Asserts that the actual value is a number within `margin` of `value`<!-- -->.

**Signature:**

```typescript
closeTo(value: number, margin: number): Assertion<number>;
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

The number that the actual value should be `margin` of.


</td></tr>
<tr><td>

margin


</td><td>

number


</td><td>

A range of which the actual value should be +-`value` in.


</td></tr>
</tbody></table>
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;number&gt;

## Remarks

_Type alias for ._

## Example


```ts
expect(11).to.be.closeTo(10, 1);
expect(100).to.be.closeTo(125, 50);
expect(5.005).to.be.closeTo(5, .01)
```
