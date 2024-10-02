---
id: expect.expectmessagebuilder.actualvalue
title: ExpectMessageBuilder.actualValue() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [actualValue](./expect.expectmessagebuilder.actualvalue.md)

## ExpectMessageBuilder.actualValue() method

Sets a value to use for the [actual value](./expect.actualplaceholder.value.md)<!-- -->.

**Signature:**

```typescript
actualValue(value?: unknown): this;
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

_(Optional)_ The value of the [actual](./expect.placeholder.actual.md) variable.


</td></tr>
</tbody></table>
**Returns:**

this

This instance, for chaining.

## Remarks

This is automatically set by [expect()](./expect.expect.md) whenever a message is built, but you can provide your own if you need to.

This can come in handy when you have additional context, or a better way to represent the "actual" value.

## Example

Lets say we were checking if two values are equal, but wanted to support enum values:

```ts
const baseMessage = new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} equal ${place.expected.value}`
);

const equal: CustomMethodImpl<defined> = (
  _,
  enumTable,
  actual: defined,
  expected: defined
) => {
  const message = baseMessage.use().expectedValue(expected);
  const valueAsEnum = enumTable[actual];
  message.actualValue(valueAsEnum);
  // ...
};
```
So instead of this output:

```logs
Expected '0' to equal "Basketball"
```
We can get this output:

```logs
Expected "Soccer" to equal "Basketball"
```
