---
id: expect.assertion.substring
title: Assertion.substring() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [substring](./expect.assertion.substring.md)

## Assertion.substring() method

Asserts that the string value contains the string `str`<!-- -->.

**Signature:**

```typescript
substring(str: string): Assertion<T>;
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

A string that should be within the value.


</td></tr>
</tbody></table>
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;T&gt;

## Example


```ts
expect("daymon").to.have.the.substring("day");
```
