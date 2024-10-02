---
id: expect.place
title: place variable
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [place](./expect.place.md)

## place variable

Utility constant for specifying dynamic variables in [expect error messages](./expect.expectmessagebuilder.md)<!-- -->.

**Signature:**

```typescript
place: Placeholder
```

## Remarks

Implements the [Placeholder](./expect.placeholder.md) interface.

Can be used for cleaner messages.

## Example


```ts
new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} equal ${place.expected.value}`
);
```
