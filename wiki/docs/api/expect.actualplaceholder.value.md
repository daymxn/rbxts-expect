---
id: expect.actualplaceholder.value
title: ActualPlaceholder.value property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ActualPlaceholder](./expect.actualplaceholder.md) &gt; [value](./expect.actualplaceholder.value.md)

## ActualPlaceholder.value property

The "actual" value in an [expect()](./expect.expect.md) statement, which can optionally be [collapsed](./expect.expectconfig.collapselength.md)<!-- -->.

**Signature:**

```typescript
value: string;
```

## Remarks

This is the value of the [actual](./expect.placeholder.actual.md) variable.

Keep in mind that this value respects the defined [collapseLength](./expect.expectconfig.collapselength.md)<!-- -->.

If you _don't_ want it to respect the collapse length, then use [fullValue](./expect.actualplaceholder.fullvalue.md) instead.

## Example

Given the following assertion chain:

```ts
expect(5).to.equal(6);
```
The value `5` is the "actual" value.
