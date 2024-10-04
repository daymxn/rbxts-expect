---
id: expect.assertion.most
title: Assertion.most() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [most](./expect.assertion.most.md)

## Assertion.most() method

Asserts that the value is less than or equal to `value`<!-- -->.

**Signature:**

```typescript
most(value: number): Assertion<number>;
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
expect(4).to.be.at.most(5);
expect(2).to.be.at.most(2);
```
