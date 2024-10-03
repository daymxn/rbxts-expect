---
id: expect.expectmessagebuilder.path
title: ExpectMessageBuilder.path() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [path](./expect.expectmessagebuilder.path.md)

## ExpectMessageBuilder.path() method

Sets a [path](./expect.placeholder.path.md) to use for the "actual" variable, when dealing with nested tests.

**Signature:**

```typescript
path(str?: string): this;
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

_(Optional)_ A displayable value to use as the [path](./expect.placeholder.path.md)<!-- -->, or undefined to reset it to empty.


</td></tr>
</tbody></table>
**Returns:**

this

This instance, for chaining.

## Remarks

If you're using a [proxy](./expect.proxy.md)<!-- -->, this will be automatically populated.

## Example

Given the message:

```ts
new ExpectMessageBuilder(
  `${place.path} - Expected ${place.actual.value} to ${place.not} have a length
of ${place.expected.value}`
);
```
For messages with paths:

```logs
parent.cars - Expected '["Tesla","Civic"]' to have a length of '3'
```
For messages without paths:

```logs
- Expected '["Tesla","Civic"]' to have a length of '3'
```
