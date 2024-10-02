---
id: expect.variabledata.type
title: VariableData.type property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [VariableData](./expect.variabledata.md) &gt; [type](./expect.variabledata.type.md)

## VariableData.type property

The type of this variable, as a string.

**Signature:**

```typescript
type?: string;
```

## Remarks

If undefined, it will be set automatically during [build](./expect.expectmessagebuilder.build.md) time to the [value](./expect.variabledata.value.md) of this variable, utilizing the macro [typeOf](https://github.com/roblox-ts/compiler-types/blob/a13fdb1171895c7ed1a7f091d18031534e988886/types/callMacros.d.ts#L11)<!-- -->.

## Example


```ts
expect(5).to.be.defined(); // "number" is the type
```
