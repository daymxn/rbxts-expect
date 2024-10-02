---
id: expect.expectmessagebuilder.copy
title: ExpectMessageBuilder.copy() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [copy](./expect.expectmessagebuilder.copy.md)

## ExpectMessageBuilder.copy() method

Creates a deep copy of this instance.

**Signature:**

```typescript
copy(): ExpectMessageBuilder;
```
**Returns:**

[ExpectMessageBuilder](./expect.expectmessagebuilder.md)

## Remarks

All of the data that has been added to it so far will still be attached.

You generally want to use the [use](./expect.expectmessagebuilder.use.md) method instead, although there's not any functional different at this moment.
