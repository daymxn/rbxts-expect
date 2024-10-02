---
id: expect.assertion.of
title: Assertion.of property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [of](./expect.assertion.of.md)

## Assertion.of property

NOOP property for cleaner chaining; does nothing.

**Signature:**

```typescript
readonly of: this;
```

## Example


```ts
expect([1,2,3]).to.not.be.of.length(1);
```
