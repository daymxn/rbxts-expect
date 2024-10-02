---
id: expect.expectmessagebuilder.pass
title: ExpectMessageBuilder.pass() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [pass](./expect.expectmessagebuilder.pass.md)

## ExpectMessageBuilder.pass() method

Returns a `Result.ok` of this instance.

**Signature:**

```typescript
pass(): Result<ExpectMessageBuilder, ExpectMessageBuilder>;
```
**Returns:**

Result&lt;[ExpectMessageBuilder](./expect.expectmessagebuilder.md)<!-- -->, [ExpectMessageBuilder](./expect.expectmessagebuilder.md)<!-- -->&gt;

## Remarks

Used to signify that the check passed, and that everything was as expected.

Returning a message is important, because the [method](./expect.custommethodimpl.md) doesn't know if the check was [negated](./expect.assertion.not.md) or not.

In other-words, even though your check passed- it could still result in an error message.

The data you return in your message is used to populate that error.

## Example

For example, lets say we were checking if two values were equal.

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
If the values are equal, we return a `pass`<!-- -->. This means no error message is thrown.

But what if the user expected the values to NOT be equal?

```ts
expect(5).to.not.equal(5);
```
In this case, `expect` is looking to see if the `equal` check passes. If it does, then we throw an error.

```logs
Expected '5' to NOT equal '5'.
```
