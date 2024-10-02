---
id: expect.assertion.object
title: Assertion.object() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [object](./expect.assertion.object.md)

## Assertion.object() method

Asserts that the value is a [table](https://create.roblox.com/docs/luau/tables)<!-- -->.

**Signature:**

```typescript
object(): Assertion<object>;
```
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;object&gt;

## Remarks

Just a wrapper around , but with the `table` type provided automatically.

_Type alias for [table](./expect.assertion.table.md)<!-- -->._

## Example


```ts
expect({ age: 5 }).to.be.an.object();
```
