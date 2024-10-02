---
id: expect.expectmessagebuilder.failwithreason
title: ExpectMessageBuilder.failWithReason() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [failWithReason](./expect.expectmessagebuilder.failwithreason.md)

## ExpectMessageBuilder.failWithReason() method

Returns a [failure](./expect.expectmessagebuilder.fail.md) with the [reason](./expect.expectmessagebuilder.reason.md) attached.

**Signature:**

```typescript
failWithReason(reason: string): Result<ExpectMessageBuilder, ExpectMessageBuilder>;
```

## Parameters

<table><thead><tr><th>

Parameter


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

reason


</td><td>

string


</td><td>

The [reason](./expect.expectmessagebuilder.reason.md) to populate the message with.


</td></tr>
</tbody></table>
**Returns:**

Result&lt;[ExpectMessageBuilder](./expect.expectmessagebuilder.md)<!-- -->, [ExpectMessageBuilder](./expect.expectmessagebuilder.md)<!-- -->&gt;

## Example


```ts
return message.failWithReason("but it was not");

// is the same as:
return message.reason("but it was not").fail();
```
