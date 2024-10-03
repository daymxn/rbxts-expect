---
id: expect.expectmessagebuilder.expectedvalue
title: ExpectMessageBuilder.expectedValue() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [expectedValue](./expect.expectmessagebuilder.expectedvalue.md)

## ExpectMessageBuilder.expectedValue() method

Sets a value to use for the [expected value](./expect.expectedplaceholder.value.md)<!-- -->.

**Signature:**

```typescript
expectedValue(value?: unknown): this;
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

_(Optional)_ The value of the [expected](./expect.placeholder.expected.md) variable.


</td></tr>
</tbody></table>
**Returns:**

this

This instance, for chaining.

## Remarks

This is usually the first thing your do when creating a message in your method.

The reason you have to do this yourself, instead of [expect()](./expect.expect.md) handling it for you- is because your test case may not have an expected value. Or the expected value may not be the first argument.

The  method is a perfect example of this; where the first argument is the enum type, and the second argument is the value to check for.

## Example

Lets say we were checking if two values are equal:

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
  // ...
};
```
Example output:

```logs
Expected "4" to equal '4'
```
