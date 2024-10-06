---
id: expect.assertion.endwith_1
title: Assertion.endWith() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [endWith](./expect.assertion.endwith_1.md)

## Assertion.endWith() method

Asserts that the actual value is a string that ends with the specified string.

**Signature:**

```typescript
endWith(str: string): Assertion<string>;
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

str


</td><td>

string


</td><td>

A string that should be at the end of the actual value.


</td></tr>
</tbody></table>
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;string&gt;

This instance for chaining.

## Example


```ts
expect("Daymon").to.endWith("mon");
```
