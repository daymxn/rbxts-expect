---
id: expect.assertion.negative
title: Assertion.negative() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [negative](./expect.assertion.negative.md)

## Assertion.negative() method

Asserts that the value is a negative number.

**Signature:**

```typescript
negative(): Assertion<number>;
```
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;number&gt;

## Remarks

A negative number is any number less than zero.

## Example


```ts
expect(-1).to.be.negative();

expect(0).to.not.be.negative();
expect(1).to.not.be.negative();
```
