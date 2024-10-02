---
id: expect.assertion.that
title: Assertion.that property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [that](./expect.assertion.that.md)

## Assertion.that property

NOOP property for cleaner chaining; does nothing.

**Signature:**

```typescript
readonly that: this;
```

## Example


```ts
expect([1,2,3]).to.be.an.array().that.includes(1);
```
