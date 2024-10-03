---
id: expect.luaenum
title: LuaEnum type
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [LuaEnum](./expect.luaenum.md)

## LuaEnum type

A user-defined enum, as it would be defined in the transpiled Lua.

**Signature:**

```typescript
type LuaEnum = Record<string | number, string>;
```

## Remarks

Used for type safe identification of enum tables.

## Example


```ts
enum Sport {
  Basketball,
  Football,
  Soccer
};

function PrintEnumValue(enum: LuaEnum, value: keyof LuaEnum) {
  print(enum[value]);
}

PrintEnumValue(Sport, "Soccer");
```
