---
id: expect.assertion.gt
title: Assertion.gt() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [gt](./expect.assertion.gt.md)

## Assertion.gt() method

Asserts that the value is greater than `value`<!-- -->.

**Signature:**

```typescript
gt(value: number): Assertion<number>;
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

A number that the actual value should be greater than.


</td></tr>
</tbody></table>
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;number&gt;

## Remarks

_Type alias for [greaterThan](./expect.assertion.greaterthan.md)<!-- -->._

## Example


```ts
expect(5).to.be.gt(4);
```
