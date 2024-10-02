---
id: expect.assertion.include
title: Assertion.include() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [include](./expect.assertion.include.md)

## Assertion.include() method

Asserts that the `expectedValue` is a value in the array.

**Signature:**

```typescript
include(expectedValue: InferArrayElement<T>): this;
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

expectedValue


</td><td>

[InferArrayElement](./expect.inferarrayelement.md)<!-- -->&lt;T&gt;


</td><td>

A value that should be included in the array.


</td></tr>
</tbody></table>
**Returns:**

this

## Remarks

The value is looked for in a _shallow_ context.

For strings, use the [substring](./expect.assertion.substring.md) method.

## Example


```ts
expect([1,2,3]).to.include(1);
expect([1]).to.not.include(2);
```
