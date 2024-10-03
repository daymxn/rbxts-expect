---
id: expect.expectmessagebuilder.expected
title: ExpectMessageBuilder.expected() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [expected](./expect.expectmessagebuilder.expected.md)

## ExpectMessageBuilder.expected() method

Overwrites all the values for the [expected](./expect.placeholder.expected.md) variable.

**Signature:**

```typescript
expected(data: VariableData): this;
```

## Parameters

<table><thead><tr><th>

Parameter


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

data


</td><td>

[VariableData](./expect.variabledata.md)


</td><td>

A [VariableData](./expect.variabledata.md) containing the  and [value](./expect.variabledata.value.md) of the [expected](./expect.placeholder.expected.md) variable.


</td></tr>
</tbody></table>
**Returns:**

this

This instance, for chaining.

## Remarks

Instead of calling [expectedValue](./expect.expectmessagebuilder.expectedvalue.md) and [expectedType](./expect.expectmessagebuilder.expectedtype.md) separately, you can call this method to set them both at once.

## Example


```ts
const customEqual: CustomMethodImpl<defined> = (
  _,
  actual: defined,
  expected: defined
) => {
  const message = baseMessage.use().expected({
    value: expected,
    type: typeOf(expected)
  });

  // ...
};
```
