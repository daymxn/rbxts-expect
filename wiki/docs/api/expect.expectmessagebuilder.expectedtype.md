---
id: expect.expectmessagebuilder.expectedtype
title: ExpectMessageBuilder.expectedType() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [expectedType](./expect.expectmessagebuilder.expectedtype.md)

## ExpectMessageBuilder.expectedType() method

Sets a value to use for the .

**Signature:**

```typescript
expectedType(typeStr?: string): this;
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

typeStr


</td><td>

string


</td><td>

_(Optional)_ The type of the [expected](./expect.placeholder.expected.md) variable as a string, or undefined to reset it (defaults to the `typeOf` of the [expectedValue](./expect.expectmessagebuilder.expectedvalue.md)<!-- -->).


</td></tr>
</tbody></table>
**Returns:**

this

This instance, for chaining.

## Remarks

You usually don't need to set this yourself.

This comes in handy when you wanna provide additional type information about the expected type.

The  method is a perfect example of this; where the type for enum values becomes `enum/number` instead of `number`<!-- -->.

## Example

Lets say we were checking if types are equal, but wanted to support a custom class:

```ts
const baseMessage = new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} equal ${place.expected.value} (${place.expected.type})`
);

const customEqual: CustomMethodImpl<defined> = (
  _,
  actual: defined,
  expected: defined
) => {
  const message = baseMessage.use().expectedValue(expected);

  if(isMyCustomType(expected)) {
    message.expectedType("MyCustomType");
    // ...
  }
};
```
Example output:

```logs
Expected "4" to equal '4' (number)
Expected '{"name":"Daymon"}' to equal '{"name":"Bryan"}' (MyCustomType)
```
