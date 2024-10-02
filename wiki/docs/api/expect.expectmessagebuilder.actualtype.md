---
id: expect.expectmessagebuilder.actualtype
title: ExpectMessageBuilder.actualType() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [actualType](./expect.expectmessagebuilder.actualtype.md)

## ExpectMessageBuilder.actualType() method

Sets a value to use for the .

**Signature:**

```typescript
actualType(typeStr?: string): this;
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

_(Optional)_ The type of the [actual](./expect.placeholder.actual.md) variable as a string, or undefined to reset it (defaults to the `typeOf` of the [actualValue](./expect.expectmessagebuilder.actualvalue.md)<!-- -->).


</td></tr>
</tbody></table>
**Returns:**

this

This instance, for chaining.

## Remarks

You usually don't need to set this yourself.

This comes in handy when you wanna provide additional type information about the actual type.

The  method is a perfect example of this; where the type for enum values becomes `enum/number` instead of `number`<!-- -->.

## Example

Lets say we were checking if types are equal, but wanted to support a custom class:

```ts
const baseMessage = new ExpectMessageBuilder(
  `Expected ${place.actual.value} (${place.actual.type}) to ${place.not} equal ${place.expected.value}`
);

const customEqual: CustomMethodImpl<defined> = (
  _,
  actual: defined,
  expected: defined
) => {
  const message = baseMessage.use().expectedValue(expected);

  if(isMyCustomType(actual)) {
    message.actualType("MyCustomType");
    // ...
  }
};
```
Example output:

```logs
Expected "4" (number) to equal '4'
Expected '{"name":"Daymon"}' (MyCustomType) to equal '{"name":"Bryan"}'
```
