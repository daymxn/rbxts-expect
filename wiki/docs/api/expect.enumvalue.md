---
id: expect.enumvalue
title: EnumValue type
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [EnumValue](./expect.enumvalue.md)

## EnumValue type

The value of an enum in a [LuaEnum](./expect.luaenum.md)<!-- -->.

**Signature:**

```typescript
type EnumValue<E> = E[keyof E];
```

## Remarks

Used for type safe identification of enum values.

## Example


```ts
enum Sport {
  Basketball,
  Football,
  Soccer
};

function PrintEnumValue<R>(enum: R & LuaEnum, value: EnumValue<R>) {
  print(enum[value]);
}

PrintEnumValue(Sport, "Soccer");
```
