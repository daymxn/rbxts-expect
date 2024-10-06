---
id: expect.assertion.near
title: Assertion.near() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [near](./expect.assertion.near.md)

## Assertion.near() method

Asserts that the actual value is a number within epsilon of `value`<!-- -->.

**Signature:**

```typescript
near(value: number): Assertion<number>;
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

The number that the actual value should be within epsilon of.


</td></tr>
</tbody></table>
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;number&gt;

## Remarks

An epsilon is the smallest number representable by a 64 bit double.

Specifically, this method uses the IEEE 754 standard of `2.220446049250313e-16`<!-- -->.

## Example


```ts
const epsilon = 2.220446049250313e-16;
expect(10-epsilon).to.be.near(10);
```
