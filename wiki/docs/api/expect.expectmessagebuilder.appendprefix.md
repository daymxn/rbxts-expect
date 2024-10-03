---
id: expect.expectmessagebuilder.appendprefix
title: ExpectMessageBuilder.appendPrefix() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [appendPrefix](./expect.expectmessagebuilder.appendprefix.md)

## ExpectMessageBuilder.appendPrefix() method

Adds a string to the end of the existing prefix.

**Signature:**

```typescript
appendPrefix(str: string): this;
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

The string to add to the end of the prefix.


</td></tr>
</tbody></table>
**Returns:**

this

This instance, for chaining.

## Remarks

This includes the negation prefix (if any).

## Example


```ts
new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} equal ${place.expected.value}`
).appendPrefix(", but it was not.");

// Would be the same as
new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} equal ${place.expected.value},
but it was not.`
);
```
