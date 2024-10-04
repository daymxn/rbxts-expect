---
id: expect.assertion.lt
title: Assertion.lt() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [lt](./expect.assertion.lt.md)

## Assertion.lt() method

Asserts that the value is less than `value`<!-- -->.

**Signature:**

```typescript
lt(value: number): Assertion<number>;
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

A number that the actual value should be less than.


</td></tr>
</tbody></table>
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;number&gt;

## Remarks

_Type alias for [lessThan](./expect.assertion.lessthan.md)<!-- -->._

## Example


```ts
expect(5).to.be.lt(4);
```
