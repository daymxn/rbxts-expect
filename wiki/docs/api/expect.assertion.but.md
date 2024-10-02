---
id: expect.assertion.but
title: Assertion.but property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [but](./expect.assertion.but.md)

## Assertion.but property

NOOP property for cleaner chaining; does nothing.

**Signature:**

```typescript
readonly but: this;
```

## Example


```ts
expect({ age: 5 }).to.be.a.table().but.not.an.array();
```
