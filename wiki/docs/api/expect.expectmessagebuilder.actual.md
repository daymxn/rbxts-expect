---
id: expect.expectmessagebuilder.actual
title: ExpectMessageBuilder.actual() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [actual](./expect.expectmessagebuilder.actual.md)

## ExpectMessageBuilder.actual() method

Overwrites all the values for the [actual](./expect.placeholder.actual.md) variable.

**Signature:**

```typescript
actual(data: VariableData): this;
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

A [VariableData](./expect.variabledata.md) containing the  and [value](./expect.variabledata.value.md) of the [actual](./expect.placeholder.actual.md) variable.


</td></tr>
</tbody></table>
**Returns:**

this

This instance, for chaining.

## Remarks

Instead of calling [actualValue](./expect.expectmessagebuilder.actualvalue.md) and [actualType](./expect.expectmessagebuilder.actualtype.md) separately, you can call this method to set them both at once.

## Example


```ts
const customEqual: CustomMethodImpl<defined> = (
  _,
  actual: defined,
  expected: defined
) => {
  const message = baseMessage.use().actual({
    value: actual,
    type: typeOf(actual)
  });

  // ...
};
```
