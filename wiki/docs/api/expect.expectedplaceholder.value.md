---
id: expect.expectedplaceholder.value
title: ExpectedPlaceholder.value property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectedPlaceholder](./expect.expectedplaceholder.md) &gt; [value](./expect.expectedplaceholder.value.md)

## ExpectedPlaceholder.value property

The "expected" value in an [expect()](./expect.expect.md) statement, which can optionally be [collapsed](./expect.expectconfig.collapselength.md)<!-- -->.

**Signature:**

```typescript
value: string;
```

## Remarks

This is the value of the [expected](./expect.placeholder.expected.md) variable.

Keep in mind that this value respects the defined [collapseLength](./expect.expectconfig.collapselength.md)<!-- -->.

If you _don't_ want it to respect the collapse length, then use [fullValue](./expect.expectedplaceholder.fullvalue.md) instead.

## Example

Given the following assertion chain:

```ts
expect(5).to.equal(6);
```
The value `6` is the "expected" value.
