---
id: expect.expectmethodresult
title: ExpectMethodResult type
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMethodResult](./expect.expectmethodresult.md)

## ExpectMethodResult type

The result of an [expect()](./expect.expect.md) method call.

**Signature:**

```typescript
type ExpectMethodResult = Result<ExpectMessageBuilder, ExpectMessageBuilder>;
```
**References:** [ExpectMessageBuilder](./expect.expectmessagebuilder.md)

## Remarks

A value of `Result.ok` means the check passed.

A value of `Result.err` means the check failed.
