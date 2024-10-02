---
id: expect.expectmessagebuilder.name
title: ExpectMessageBuilder.name() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [name](./expect.expectmessagebuilder.name.md)

## ExpectMessageBuilder.name() method

Sets a [name](./expect.placeholder.name.md) to use for the "actual" variable, when dealing with messages without [paths](./expect.expectmessagebuilder.path.md)<!-- -->.

**Signature:**

```typescript
name(value?: unknown): this;
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

value


</td><td>

unknown


</td><td>

_(Optional)_ A displayable value to use as a [name](./expect.placeholder.name.md)<!-- -->, or undefined to reset it (which defaults to the [actual value](./expect.actualplaceholder.value.md)<!-- -->).


</td></tr>
</tbody></table>
**Returns:**

this

This instance, for chaining.

## Remarks

The value does not need to be a string, as the method will call `tostring` for you.

This can be useful in try-catch blocks, as the error attached to `catch` is `undefined` due to typescript.

## Example

Given the message:

```ts
new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} have a length
of ${place.expected.value}`
).name("the object");
```
For messages with paths:

```logs
Expected parent.cars to have a length of '3'
```
For messages without paths:

```logs
Expected the object to have a length of '3'
```
