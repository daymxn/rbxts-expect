---
id: expect.assertion.boolean
title: Assertion.boolean() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [boolean](./expect.assertion.boolean.md)

## Assertion.boolean() method

Asserts that the value is a [boolean](https://create.roblox.com/docs/luau/booleans)<!-- -->.

**Signature:**

```typescript
boolean(): Assertion<boolean>;
```
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;boolean&gt;

## Remarks

Just a wrapper around , but with the `boolean` type provided automatically.

## Example


```ts
expect(true).to.be.a.boolean();
expect(false).to.be.a.boolean();
```
