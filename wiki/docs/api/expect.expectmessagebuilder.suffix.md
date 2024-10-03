---
id: expect.expectmessagebuilder.suffix
title: ExpectMessageBuilder.suffix() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [suffix](./expect.expectmessagebuilder.suffix.md)

## ExpectMessageBuilder.suffix() method

Adds a string to show at the end of the message, before the metadata.

**Signature:**

```typescript
suffix(str?: string): this;
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

str


</td><td>

string


</td><td>

_(Optional)_ The string to add after the message.


</td></tr>
</tbody></table>
**Returns:**

this

This instance, for chaining.

## Remarks

_Note that there can only be one, calling this method again will replace the previous value- not append to it_

## Example


```ts
new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} equal ${place.expected.value}`
)
.suffix(` because ${place.reason}`)
.appendPrefix(", but it was not");

// Would be the same as
new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} equal ${place.expected.value},
but it was not because ${place.reason}`
);
```
