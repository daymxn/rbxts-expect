---
id: expect.custommethodimpls
title: CustomMethodImpls type
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [CustomMethodImpls](./expect.custommethodimpls.md)

## CustomMethodImpls type

An object of [expect()](./expect.expect.md) method names to [implementations](./expect.custommethodimpl.md)<!-- -->.

**Signature:**

```typescript
type CustomMethodImpls<T> = {
    [key: string]: CustomMethodImpl<T>;
};
```
**References:** [CustomMethodImpl](./expect.custommethodimpl.md)

## Remarks

To be used with [extendMethods()](./expect.extendmethods.md) to add additional methods to [expect()](./expect.expect.md)<!-- -->.

Each key will map to the respective method. So you can add multiple methods at once, or provide alternative namings for the same method.

## Example


```ts
const equal: CustomMethodImpl<defined> = (...);

extendMethods({
  equal: equal,
  equals: equal,
  eql: equal
});
```
