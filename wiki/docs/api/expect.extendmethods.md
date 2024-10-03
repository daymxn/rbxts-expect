---
id: expect.extendmethods
title: extendMethods() function
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [extendMethods](./expect.extendmethods.md)

## extendMethods() function

Adds additional methods to [expect()](./expect.expect.md)<!-- -->.

**Signature:**

```typescript
declare function extendMethods(methods: CustomMethodImpls<never>): void;
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

methods


</td><td>

[CustomMethodImpls](./expect.custommethodimpls.md)<!-- -->&lt;never&gt;


</td><td>

An object of method names to [implementations](./expect.custommethodimpl.md)


</td></tr>
</tbody></table>
**Returns:**

void

## Remarks

By passing in an object mapping of method names to [implementations](./expect.custommethodimpl.md)<!-- -->, you can add additional methods to [expect()](./expect.expect.md)<!-- -->.

## Example


```ts
// create a message for the method
const baseMessage = new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} equal ${place.expected.value}`
)

// create an implementation for the method
const equal: CustomMethodImpl<defined> = (
  _,
  actual: defined,
  expected: defined
) => {
  const message = baseMessage.use().expectedValue(expected);

  return actual === expected ? message.pass() : message.fail();
};

// augment the expect module so typescript knows the method exists
declare module "@rbxts/expect" {
  interface Assertion<T> {
    eq<R = T>(expectedValue: R): Assertion<R>;
    equal<R = T>(expectedValue: R): Assertion<R>;
    equals<R = T>(expectedValue: R): Assertion<R>;
  }
}

// add the methods to expect for runtime usage
extendMethods({
  equal: equal,
  equals: equal,
  eq: equal
});
```
