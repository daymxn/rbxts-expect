---
id: expect.assertion.finite
title: Assertion.finite() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [finite](./expect.assertion.finite.md)

## Assertion.finite() method

Asserts that the actual value is a number within `+-math.huge`<!-- -->.

**Signature:**

```typescript
finite(): Assertion<number>;
```
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;number&gt;

## Remarks

This comparison is exclusive, meaning a number that is `math.huge` or `-math.huge` is considered a fail.

## Example


```ts
expect(5).to.be.finite();
expect(-5).to.be.finite();

expect("5").to.not.be.finite();
expect(math.huge).to.not.be.finite();
```
