---
id: expect.assertion.number
title: Assertion.number() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [number](./expect.assertion.number.md)

## Assertion.number() method

Asserts that the value is a [number](https://create.roblox.com/docs/luau/numbers)<!-- -->.

**Signature:**

```typescript
number(): Assertion<number>;
```
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;number&gt;

## Remarks

Just a wrapper around , but with the `number` type provided automatically.

## Example


```ts
expect(1).to.be.a.number();
```
