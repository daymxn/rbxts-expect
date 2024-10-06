---
id: expect.assertion.positive
title: Assertion.positive() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [positive](./expect.assertion.positive.md)

## Assertion.positive() method

Asserts that the value is a positive number.

**Signature:**

```typescript
positive(): Assertion<number>;
```
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;number&gt;

## Remarks

A positive number is any number greater than zero.

## Example


```ts
expect(1).to.be.positive();

expect(0).to.not.be.positive();
expect(-1).to.not.be.positive();
```
