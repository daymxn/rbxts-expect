---
id: expect.assertion.within
title: Assertion.within() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [within](./expect.assertion.within.md)

## Assertion.within() method

Asserts that the actual value is a number within a specified range.

**Signature:**

```typescript
within(minValue: number, maxValue: number): Assertion<number>;
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

minValue


</td><td>

number


</td><td>

The lower end of what this value can be.


</td></tr>
<tr><td>

maxValue


</td><td>

number


</td><td>

The higher end of what this value can be.


</td></tr>
</tbody></table>
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;number&gt;

## Remarks

_Type alias for [between](./expect.assertion.between.md)<!-- -->._

## Example


```ts
expect(10).to.be.within(5, 15);
expect(5).to.be.within(5, 6);
```
