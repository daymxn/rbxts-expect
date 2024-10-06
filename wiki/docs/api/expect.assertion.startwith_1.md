---
id: expect.assertion.startwith_1
title: Assertion.startWith() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [startWith](./expect.assertion.startwith_1.md)

## Assertion.startWith() method

Asserts that the actual value is a string that starts with the specified string.

**Signature:**

```typescript
startWith(str: string): Assertion<string>;
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

A string that should be at the start of the actual value.


</td></tr>
</tbody></table>
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;string&gt;

This instance for chaining.

## Example


```ts
expect("Daymon").to.startWith("Day");
```
