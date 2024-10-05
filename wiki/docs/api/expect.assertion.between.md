---
id: expect.assertion.between
title: Assertion.between() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [between](./expect.assertion.between.md)

## Assertion.between() method

Asserts that the actual value is a number within a specified range.

**Signature:**

```typescript
between(minValue: number, maxValue: number): Assertion<number>;
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

The check is performed **inclusively**, so an actual value of `2` and a `minValue` of `2` is considered a pass.

## Example


```ts
expect(10).to.be.between(5, 15);
expect(5).to.be.between(5, 6);
```
