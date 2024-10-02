---
id: expect.expectedplaceholder.type
title: ExpectedPlaceholder.type property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectedPlaceholder](./expect.expectedplaceholder.md) &gt; [type](./expect.expectedplaceholder.type.md)

## ExpectedPlaceholder.type property

A string representing the type of the [expected value](./expect.expectedplaceholder.value.md) in an [expect()](./expect.expect.md) statement.

**Signature:**

```typescript
type: string;
```

## Remarks

By default, this value gets set automatically via the macro [typeOf](https://github.com/roblox-ts/compiler-types/blob/a13fdb1171895c7ed1a7f091d18031534e988886/types/callMacros.d.ts#L11)<!-- -->.

But you can optionally override this for custom types via [ExpectMessageBuilder.expectedType()](./expect.expectmessagebuilder.expectedtype.md)<!-- -->.

## Example

Let's say we were checking if two values were equal:

```ts
new ExpectMessageBuilder(
 `Expected ${place.actual.value} (${place.actual.type}) to be
equal to ${place.expected.value} (${place.expected.type})`
);
```
We'd get output like:

```logs
Expected '5' (number) to be equal to "5" (string)
```
