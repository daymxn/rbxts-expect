---
id: expect.assertion.which
title: Assertion.which property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [which](./expect.assertion.which.md)

## Assertion.which property

NOOP property for cleaner chaining; does nothing.

**Signature:**

```typescript
readonly which: this;
```

## Example


```ts
expect([1,2,3]).to.be.an.array().which.includes(1);
```
