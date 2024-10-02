---
id: expect.assertion.function
title: Assertion.function() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [function](./expect.assertion.function.md)

## Assertion.function() method

Asserts that the value is a [function](https://create.roblox.com/docs/luau/functions)<!-- -->.

**Signature:**

```typescript
function(): Assertion<object>;
```
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;object&gt;

## Remarks

Just a wrapper around , but with the `function` type provided automatically.

## Example


```ts
expect(() => {}).to.be.a.function();
```
