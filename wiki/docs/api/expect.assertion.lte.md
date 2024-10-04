---
id: expect.assertion.lte
title: Assertion.lte() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [lte](./expect.assertion.lte.md)

## Assertion.lte() method

Asserts that the value is less than or equal to `value`<!-- -->.

**Signature:**

```typescript
lte(value: number): Assertion<number>;
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

A number that the actual value should be less than or equal to.


</td></tr>
</tbody></table>
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;number&gt;

## Remarks

_Type alias for [lessThanOrEqualTo](./expect.assertion.lessthanorequalto.md)<!-- -->._

## Example


```ts
expect(4).to.be.lte(5);
expect(2).to.be.lte(2);
```
