---
id: expect.actualplaceholder.fullvalue
title: ActualPlaceholder.fullValue property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ActualPlaceholder](./expect.actualplaceholder.md) &gt; [fullValue](./expect.actualplaceholder.fullvalue.md)

## ActualPlaceholder.fullValue property

The "actual" value in an [expect()](./expect.expect.md) statement, which is _not_ [collapsed](./expect.expectconfig.collapselength.md)<!-- -->.

**Signature:**

```typescript
fullValue: string;
```

## Remarks

This is the "full" value of the [actual](./expect.placeholder.actual.md) variable.

It being full means that it does NOT respect the defined [collapseLength](./expect.expectconfig.collapselength.md)<!-- -->.

If you _do_ want it to respect the collapse length, then use [value](./expect.actualplaceholder.value.md) instead.

By default, most messages already have the [attachFullOnCollapse](./expect.expectmessagebuilderoptions.attachfulloncollapse.md) setting enabled, so you don't usually have to attach this yourself.

## Example

For example, lets say we were checking if an object had any keys:

```ts
new ExpectMessageBuilder(
 `Expected ${place.actual.value} to NOT have any keys`
).metadata({FullValue: place.actual.fullValue});
```
And the object was larger than our configured `collapseLength`<!-- -->, and ended up collapsed:

```logs
Expected '{...}' to NOT have any keys
FullValue: '{"name":"Daymon","age":24}'
```
This allows us to keep the main message short and easy to read, while still retaining the full value for debugging.
