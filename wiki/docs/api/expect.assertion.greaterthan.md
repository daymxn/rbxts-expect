---
id: expect.assertion.greaterthan
title: Assertion.greaterThan() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [greaterThan](./expect.assertion.greaterthan.md)

## Assertion.greaterThan() method

Asserts that the value is greater than `value`<!-- -->.

**Signature:**

```typescript
greaterThan(value: number): Assertion<number>;
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

## Example


```ts
expect(5).to.be.greaterThan(4);
```
