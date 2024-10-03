---
id: expect.expectmessagebuilder.use
title: ExpectMessageBuilder.use() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [use](./expect.expectmessagebuilder.use.md)

## ExpectMessageBuilder.use() method

Create a copy of this instance, to be populated with data.

**Signature:**

```typescript
use(trailingPrefix?: string, trailingFailurePrefix?: string): ExpectMessageBuilder;
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

trailingPrefix


</td><td>

string


</td><td>

_(Optional)_ An additional string to add at the end of the existing prefix (including the negation prefix).


</td></tr>
<tr><td>

trailingFailurePrefix


</td><td>

string


</td><td>

_(Optional)_ An additional string to add at the end of the existing prefix, but only in the case of failure (replaces the existing [trailingFailurePrefix](./expect.expectmessagebuilder.trailingfailureprefix.md)<!-- -->).


</td></tr>
</tbody></table>
**Returns:**

[ExpectMessageBuilder](./expect.expectmessagebuilder.md)

A new copy of this instance, ready to be used.

## Remarks

This is the primary entry point into using a message.

Since data attached to an [ExpectMessageBuilder](./expect.expectmessagebuilder.md) persists, if you _don't_ create a copy of the instance in your method, the next caller will still have that data in their message.

## Example


```ts
const baseMessage = new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} equal ${place.expected.value}`
);

const equal: CustomMethodImpl<defined> = (
  _,
  actual: defined,
  expected: defined
) => {
  const message = baseMessage.use().expectedValue(expected);

  return actual === expected ? message.pass() : message.fail();
};
```
