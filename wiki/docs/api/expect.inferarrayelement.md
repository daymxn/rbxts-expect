---
id: expect.inferarrayelement
title: InferArrayElement type
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [InferArrayElement](./expect.inferarrayelement.md)

## InferArrayElement type

Helper type for inferring the type of an array.

**Signature:**

```typescript
type InferArrayElement<T> = T extends (infer U)[] ? U : never;
```

## Example


```ts
function include<T>(source: T, expectedValue: InferArrayElement<T>) {
  return source.includes(expectedValue);
}
```
