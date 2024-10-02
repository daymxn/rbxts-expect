---
id: expect.expectmessagebuilder.fail
title: ExpectMessageBuilder.fail() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [fail](./expect.expectmessagebuilder.fail.md)

## ExpectMessageBuilder.fail() method

Returns a `Result.err` of this instance.

**Signature:**

```typescript
fail(): Result<ExpectMessageBuilder, ExpectMessageBuilder>;
```
**Returns:**

Result&lt;[ExpectMessageBuilder](./expect.expectmessagebuilder.md)<!-- -->, [ExpectMessageBuilder](./expect.expectmessagebuilder.md)<!-- -->&gt;

## Remarks

Used to signify that the check failed, and that something was not as expected.

Keep in mind that even if the message failed, that doesn't mean an error will be thrown; because the [method](./expect.custommethodimpl.md) doesn't know if the check was [negated](./expect.assertion.not.md) or not.

In other-words, even though your check fails- it might not result in an error message.

In the case that it does, the data you return in your message is used to populate that error.

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
If the values are NOT equal, we return a `fail`<!-- -->. This means an error message is thrown.

```logs
Expect '5' to equal '4'
```
But what if the user expected the values to not be equal?

```ts
expect(5).to.not.equal(4);
```
In this case, `expect` is looking to see if the `equal` check fails. If it does, then we don't throw an error.
