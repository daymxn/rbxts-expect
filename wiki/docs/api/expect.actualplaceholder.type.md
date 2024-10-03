---
id: expect.actualplaceholder.type
title: ActualPlaceholder.type property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ActualPlaceholder](./expect.actualplaceholder.md) &gt; [type](./expect.actualplaceholder.type.md)

## ActualPlaceholder.type property

A string representing the type of the [actual value](./expect.actualplaceholder.value.md) in an [expect()](./expect.expect.md) statement.

**Signature:**

```typescript
type: string;
```

## Remarks

By default, this value gets set automatically via the macro [typeOf](https://github.com/roblox-ts/compiler-types/blob/a13fdb1171895c7ed1a7f091d18031534e988886/types/callMacros.d.ts#L11)<!-- -->.

But you can optionally override this for custom types via [ExpectMessageBuilder.actualType()](./expect.expectmessagebuilder.actualtype.md)<!-- -->.

## Example

Let's say we were checking if a value was an array:

```ts
new ExpectMessageBuilder(
 `Expected ${place.actual.value} (${place.actual.type}) to be an array`
);
```
We'd get output like:

```logs
Expected '5' (number) to be an array
```
