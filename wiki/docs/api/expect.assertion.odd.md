---
id: expect.assertion.odd
title: Assertion.odd() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [odd](./expect.assertion.odd.md)

## Assertion.odd() method

Asserts that the actual value is an odd number.

**Signature:**

```typescript
odd(): Assertion<number>;
```
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;number&gt;

## Remarks

An odd number is one that has a remainder when divided by 2.

That is, it can not be evenly divided by 2.

## Example


```ts
expect(3).to.be.odd();
```
