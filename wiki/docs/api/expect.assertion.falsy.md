---
id: expect.assertion.falsy
title: Assertion.falsy() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [falsy](./expect.assertion.falsy.md)

## Assertion.falsy() method

Asserts that the value is a "falsy" value, according to luau.

**Signature:**

```typescript
falsy(): this;
```
**Returns:**

this

## Remarks

A falsy value is a value of `false` or `nil`<!-- -->.

You can read more about it on the [luau docs](https://create.roblox.com/docs/luau/booleans#conditionals).

## Example


```ts
expect(false).to.be.falsy();
expect(undefined).to.be.falsy();

expect(0).to.not.be.falsy();
expect("").to.not.be.falsy();
```
