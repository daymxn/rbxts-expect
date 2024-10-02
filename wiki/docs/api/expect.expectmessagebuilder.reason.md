---
id: expect.expectmessagebuilder.reason
title: ExpectMessageBuilder.reason() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [reason](./expect.expectmessagebuilder.reason.md)

## ExpectMessageBuilder.reason() method

Sets a value to use for the [reason](./expect.placeholder.reason.md)<!-- -->.

**Signature:**

```typescript
reason(reason?: string): this;
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

reason


</td><td>

string


</td><td>

_(Optional)_ A displayable value to use as a replacement for [reason](./expect.placeholder.reason.md)<!-- -->, or undefined to reset it to nothing.


</td></tr>
</tbody></table>
**Returns:**

this

This instance, for chaining.

## Remarks

If the message does _not_ have a `${place.reason}` in it, but was thrown with a `reason` attached via this method- then the reason will be displayed before the [metadata](./expect.expectmessagebuilder.metadata.md)<!-- -->, in the same format of `Reason: message`<!-- -->.

## Example 1

Lets say we were checking if two values are equal:

```ts
const baseMessage = new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} equal ${place.expected.value}, but ${place.reason}`
);

const equal: CustomMethodImpl<defined> = (
  _,
  actual: defined,
  expected: defined
) => {
  const message = baseMessage.use().expectedValue(expected);

  if(typeOf(actual) !== typeOf(expected)) {
    return message.reason("it was a different type").fail();
  }

  if(actual !== value) {
    return message.reason("it had a different value").fail();
  }

  // apply a default reason for negations
  return message.reason("it did").pass();
};
```
Example output:

```logs
Expected "4" to equal '4', but it was a different type
```

## Example 2

If our message didn't have a reason placeholder in it, like so:

```ts
new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} equal ${place.expected.value}`
);
```
But we still called `reason` in our logic, then it would get attached as metadata, but before any existing metadata:

```logs
Expected "4" to equal '4'
Reason: it was a different type
```
