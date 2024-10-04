---
id: expect.assertion.lessthan
title: Assertion.lessThan() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [lessThan](./expect.assertion.lessthan.md)

## Assertion.lessThan() method

Asserts that the value is less than `value`<!-- -->.

**Signature:**

```typescript
lessThan(value: number): Assertion<number>;
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

## Example


```ts
expect(5).to.be.lessThan(4);
```
