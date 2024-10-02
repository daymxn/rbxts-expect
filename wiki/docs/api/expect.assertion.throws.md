---
id: expect.assertion.throws
title: Assertion.throws() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [throws](./expect.assertion.throws.md)

## Assertion.throws() method

Asserts that the function throws an exception.

**Signature:**

```typescript
throws(): Assertion<T>;
```
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;T&gt;

## Remarks

_Type alias for the `throw` version of this._

## Example


```ts
expect(buyPet).to.be.a.function().that.throws();
```
