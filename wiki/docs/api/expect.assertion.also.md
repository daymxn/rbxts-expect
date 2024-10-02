---
id: expect.assertion.also
title: Assertion.also property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [also](./expect.assertion.also.md)

## Assertion.also property

NOOP property for cleaner chaining; does nothing.

**Signature:**

```typescript
readonly also: this;
```

## Example


```ts
expect([1,2,3]).to.include(1).but.also.include(2);
```
