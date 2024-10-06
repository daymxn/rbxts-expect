---
id: expect.assertion.endswith
title: Assertion.endsWith() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [endsWith](./expect.assertion.endswith.md)

## Assertion.endsWith() method

Asserts that the array ends with the specified elements.

**Signature:**

```typescript
endsWith(elements: InferArrayElement<T>[]): this;
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

elements


</td><td>

[InferArrayElement](./expect.inferarrayelement.md)<!-- -->&lt;T&gt;\[\]


</td><td>

Elements that the actual array should have at the ends.


</td></tr>
</tbody></table>
**Returns:**

this

This instance for chaining.

## Remarks

_Type alias for ._

## Example


```ts
expect([1,2,3]).to.be.an.array().that.endWith([2,3]);
```
