---
id: expect.expectmessagebuilder.tostring
title: ExpectMessageBuilder.toString() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [toString](./expect.expectmessagebuilder.tostring.md)

## ExpectMessageBuilder.toString() method

Returns a [built](./expect.expectmessagebuilder.build.md) copy of this message, assuming it passed and was NOT negated.

**Signature:**

```typescript
toString(): string;
```
**Returns:**

string

## Remarks

Primarily provided for debugging cases.

## Example


```ts
return message.toString();

// is the same as:
return message.build(true, false);
```
