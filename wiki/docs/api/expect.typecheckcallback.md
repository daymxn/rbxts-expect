---
id: expect.typecheckcallback
title: TypeCheckCallback type
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [TypeCheckCallback](./expect.typecheckcallback.md)

## TypeCheckCallback type

Callback for deciding if a `value` matches a given type `T`<!-- -->.

**Signature:**

```typescript
type TypeCheckCallback<T = defined> = (value: T) => boolean | string | void;
```

## Remarks

Returning a boolean of `true` means that the `value` passes the check, and is of type `T`<!-- -->. Alternatively, not returning anything (`void`<!-- -->) will also count as a pass.

On the other hand, a boolean of `false` means that the `value` did NOT pass the check, and an error will be thrown.

You can also return a string, in which case it will also be treated as a failure- but the string you provide will be propogated as a [reason](./expect.placeholder.reason.md) in the failure.

## Example


```ts
const isNumber: TypeCheckCallback = (value) => {
  return typeOf(value) === "number";
}
```
