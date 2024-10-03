---
id: expect.placeholder.actual
title: Placeholder.actual property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Placeholder](./expect.placeholder.md) &gt; [actual](./expect.placeholder.actual.md)

## Placeholder.actual property

The "actual" variable in an [expect()](./expect.expect.md) statement.

**Signature:**

```typescript
actual: ActualPlaceholder;
```

## Remarks

This is the first variable passed into [expect()](./expect.expect.md) when starting an assertion chain.

We refer to it as the "actual" variable, as it's a contrast to the [expected](./expect.placeholder.expected.md) variable.

_Note that you shouldn't use `actual` directly in your messages, instead you should use one of the properties of this type._
