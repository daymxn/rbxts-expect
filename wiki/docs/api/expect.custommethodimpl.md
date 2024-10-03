---
id: expect.custommethodimpl
title: CustomMethodImpl type
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [CustomMethodImpl](./expect.custommethodimpl.md)

## CustomMethodImpl type

The implementation of a [expect()](./expect.expect.md) method.

**Signature:**

```typescript
type CustomMethodImpl<T = unknown> = (source: Assertion<T>, actual: T, ...args: never[]) => ExpectMethodResult;
```
**References:** [Assertion](./expect.assertion.md)<!-- -->, [ExpectMethodResult](./expect.expectmethodresult.md)

## Remarks

Takes in a `source` that maps to the [Assertion](./expect.assertion.md) that called this method (effectively the parent of the [expect()](./expect.expect.md) call).

The `actual` value maps to the "actual" value that was provided when [expect()](./expect.expect.md) was first called.

And `...args` can be expanded to map however many arguments the method expects. Usually, this contains the "expected" value(s).

The method should return an [ExpectMethodResult](./expect.expectmethodresult.md) corresponding to if the check represented by the method was a [pass](./expect.expectmessagebuilder.pass.md) or a [fail](./expect.expectmessagebuilder.fail.md)<!-- -->.

## Example


```ts
const baseMessage = new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} equal ${place.expected.value}`
)

const equal: CustomMethodImpl<defined> = (
  _,
  actual: defined,
  expected: defined
) => {
  const message = baseMessage.use().expectedValue(expected);

  return actual === expected ? message.pass() : message.fail();
};
```
