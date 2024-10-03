---
id: expect.assertion.enum_type
title: Assertion.enum_type property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [enum_type](./expect.assertion.enum_type.md)

## Assertion.enum_type property

Helper property for getting the mappings for a value that has passed an  check.

**Signature:**

```typescript
enum_type?: Record<number, string>;
```

## Remarks

Is set by  passing.

Can be used in other expect methods to map the "actual" value to its enum representation; typically for more descriptive errors.
