---
id: expect.assertion.key
title: Assertion.key() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [key](./expect.assertion.key.md)

## Assertion.key() method

Asserts that the table has the key `key`<!-- -->.

**Signature:**

```typescript
key(key: string): this;
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

key


</td><td>

string


</td><td>

Name of the key that the table should have.


</td></tr>
</tbody></table>
**Returns:**

this

This instance for chaining.

## Example


```ts
expect({ name: "Daymon" }).to.have.the.key("name");
```
