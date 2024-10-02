---
id: expect.expectmessagebuilder.negationsuffix
title: ExpectMessageBuilder.negationSuffix() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [negationSuffix](./expect.expectmessagebuilder.negationsuffix.md)

## ExpectMessageBuilder.negationSuffix() method

Adds a string to show at the end of the message, before the metadata.

Only applies if the message is [negated](./expect.assertion.not.md)<!-- -->.

**Signature:**

```typescript
negationSuffix(str?: string): this;
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

Will be used instead of the existing [suffix](./expect.expectmessagebuilder.suffix.md) (if any).

_Note that there can only be one, calling this method again will replace the previous value- not append to it_

## Example


```ts
new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} equal ${place.expected.value}`
)
.suffix(", but it was not.")
.negationSuffix(", but it did");

// Would be the same as
new ExpectMessageBuilder(
  `Expected ${place.name} to equal ${place.expected.value},
but it was not.`,

  `Expected ${place.name} to NOT equal ${place.expected.value},
but it did.`,
);
```
