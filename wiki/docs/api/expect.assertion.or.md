---
id: expect.assertion.or
title: Assertion.or property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [or](./expect.assertion.or.md)

## Assertion.or property

NOOP property for cleaner chaining; does nothing.

**Signature:**

```typescript
readonly or: this;
```

## Example


```ts
expect(1).to.not.be.a.string().or.a.table();
```
