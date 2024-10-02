---
id: expect.placeholder.expected
title: Placeholder.expected property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Placeholder](./expect.placeholder.md) &gt; [expected](./expect.placeholder.expected.md)

## Placeholder.expected property

The "expected" variable in an [expect()](./expect.expect.md) statement.

**Signature:**

```typescript
expected: ExpectedPlaceholder;
```

## Remarks

This is _usually_ the value passed into an assertion method, but not all methods end up having an expected value.

For example, the [empty](./expect.assertion.empty.md) method doesn't have anything it's comparing the [actual](./expect.placeholder.actual.md) value to, so it doesn't have an "expected" value.

We refer to it as the "expected" variable, as it's _usually_ what you're expecting the [actual](./expect.placeholder.actual.md) variable to be.

_Note that you shouldn't use `expected` directly in your messages, instead you should use one of the properties of this type._
