---
id: expect.assertion.endswith_1
title: Assertion.endsWith() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [endsWith](./expect.assertion.endswith_1.md)

## Assertion.endsWith() method

Asserts that the actual value is a string that ends with the specified string.

**Signature:**

```typescript
endsWith(str: string): Assertion<string>;
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

## Remarks

_Type alias for ._

## Example


```ts
expect("Daymon").to.be.a.string().that.endsWith("mon");
```
