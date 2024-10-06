---
id: expect.assertion.truthy
title: Assertion.truthy() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [truthy](./expect.assertion.truthy.md)

## Assertion.truthy() method

Asserts that the value is a "truthy" value, according to luau.

**Signature:**

```typescript
truthy(): this;
```
**Returns:**

this

## Remarks

A truthy value is any value that isn't `false` or `nil`<!-- -->.

You can read more about it on the [luau docs](https://create.roblox.com/docs/luau/booleans#conditionals).

## Example


```ts
expect(1).to.be.truthy();
expect(0).to.be.truthy();

expect("day").to.be.truthy();
expect("").to.be.truthy();
```
