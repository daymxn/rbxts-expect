---
id: expect.expectmessagebuilder.trailingfailureprefix
title: ExpectMessageBuilder.trailingFailurePrefix() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [trailingFailurePrefix](./expect.expectmessagebuilder.trailingfailureprefix.md)

## ExpectMessageBuilder.trailingFailurePrefix() method

Adds a string to the end of the existing prefix, but only if it's a [failure](./expect.expectmessagebuilder.fail.md)<!-- -->.

**Signature:**

```typescript
trailingFailurePrefix(str?: string): this;
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

_(Optional)_ The string to add to the end of the prefix.


</td></tr>
</tbody></table>
**Returns:**

this

This instance, for chaining.

## Remarks

Usually, this means `!negated`<!-- -->. So you can also look at this as a trailing prefix for non negated use-cases.

Comes before the [suffix](./expect.expectmessagebuilder.suffix.md)<!-- -->.

_Note that there can only be one, calling this method again will replace the previous value- not append to it_

## Example


```ts
new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} equal ${place.expected.value}`
).trailingFailurePrefix(", but it was not");

// Would be the same as
new ExpectMessageBuilder(
  `Expected ${place.name} to equal ${place.expected.value}, but it was not`,
  `Expected ${place.name} to NOT equal ${place.expected.value}`
);
```
