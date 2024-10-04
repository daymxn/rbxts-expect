---
id: expect.assertion.gte
title: Assertion.gte() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [gte](./expect.assertion.gte.md)

## Assertion.gte() method

Asserts that the value is greater than or equal to `value`<!-- -->.

**Signature:**

```typescript
gte(value: number): Assertion<number>;
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

A number that the actual value should be greater than or equal to.


</td></tr>
</tbody></table>
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;number&gt;

## Remarks

_Type alias for [greaterThanOrEqualTo](./expect.assertion.greaterthanorequalto.md)<!-- -->._

## Example


```ts
expect(5).to.be.gte(4);
expect(2).to.be.gte(2);
```
