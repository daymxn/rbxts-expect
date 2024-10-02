---
id: expect.assertion.does
title: Assertion.does property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [does](./expect.assertion.does.md)

## Assertion.does property

NOOP property for cleaner chaining; does nothing.

**Signature:**

```typescript
readonly does: this;
```

## Example


```ts
expect([1,2,3]).to.be.an.array().that.does.not.include(4);
```
