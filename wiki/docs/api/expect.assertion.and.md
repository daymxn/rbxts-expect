---
id: expect.assertion.and
title: Assertion.and property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [and](./expect.assertion.and.md)

## Assertion.and property

NOOP property for cleaner chaining; does nothing.

**Signature:**

```typescript
readonly and: this;
```

## Example


```ts
expect([1,2]).to.include(1).and.include(2);
```
