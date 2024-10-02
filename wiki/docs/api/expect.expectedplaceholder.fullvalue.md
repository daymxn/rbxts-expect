---
id: expect.expectedplaceholder.fullvalue
title: ExpectedPlaceholder.fullValue property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectedPlaceholder](./expect.expectedplaceholder.md) &gt; [fullValue](./expect.expectedplaceholder.fullvalue.md)

## ExpectedPlaceholder.fullValue property

The "expected" value in an [expect()](./expect.expect.md) statement, which is _not_ [collapsed](./expect.expectconfig.collapselength.md)<!-- -->.

**Signature:**

```typescript
fullValue: string;
```

## Remarks

This is the "full" value of the [expected](./expect.placeholder.expected.md) variable.

It being full means that it does NOT respect the defined [collapseLength](./expect.expectconfig.collapselength.md)<!-- -->.

If you _do_ want it to respect the collapse length, then use [value](./expect.expectedplaceholder.value.md) instead.

By default, most messages already have the [attachFullOnCollapse](./expect.expectmessagebuilderoptions.attachfulloncollapse.md) setting enabled, so you don't usually have to attach this yourself.

## Example

For example, lets say we were checking if an object matched another object:

```ts
new ExpectMessageBuilder(
 `Expected ${place.actual.value} to be equal to
${place.expected.value}
`
).metadata({
  ["Expected (full)"]: place.expected.fullValue,
  ["Actual (full)"]: place.actual.fullValue
});
```
And the object was larger than our configured `collapseLength`<!-- -->, and ended up collapsed:

```logs
Expected '{...}' to be equal to '{...}'
Expected (full): '{"name":"Bryan","age":20}'
Actual (full): '{"name":"Daymon","age":24}'
```
This allows us to keep the main message short and easy to read, while still retaining the full value for debugging.
