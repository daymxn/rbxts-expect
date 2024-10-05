---
id: expect.assertion.even
title: Assertion.even() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [even](./expect.assertion.even.md)

## Assertion.even() method

Asserts that the actual value is an even number.

**Signature:**

```typescript
even(): Assertion<number>;
```
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;number&gt;

## Remarks

An even number is one that can be divided by 2, without any remainder.

## Example


```ts
expect(4).to.be.even();
```
