---
id: expect.assertion.table
title: Assertion.table() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [table](./expect.assertion.table.md)

## Assertion.table() method

Asserts that the value is a [table](https://create.roblox.com/docs/luau/tables)<!-- -->.

**Signature:**

```typescript
table(): Assertion<object>;
```
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;object&gt;

## Remarks

Just a wrapper around , but with the `table` type provided automatically.

## Example


```ts
expect({ age: 5 }).to.be.a.table();
```
