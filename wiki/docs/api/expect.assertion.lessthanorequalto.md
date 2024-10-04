---
id: expect.assertion.lessthanorequalto
title: Assertion.lessThanOrEqualTo() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [lessThanOrEqualTo](./expect.assertion.lessthanorequalto.md)

## Assertion.lessThanOrEqualTo() method

Asserts that the value is less than or equal to `value`<!-- -->.

**Signature:**

```typescript
lessThanOrEqualTo(value: number): Assertion<number>;
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

## Example


```ts
expect(4).to.be.lessThanOrEqualTo(5);
expect(2).to.be.lessThanOrEqualTo(2);
```
