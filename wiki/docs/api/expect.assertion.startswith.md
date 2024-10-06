---
id: expect.assertion.startswith
title: Assertion.startsWith() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [startsWith](./expect.assertion.startswith.md)

## Assertion.startsWith() method

Asserts that the array starts with the specified elements.

**Signature:**

```typescript
startsWith(elements: InferArrayElement<T>[]): this;
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

Elements that the actual array should have at the start.


</td></tr>
</tbody></table>
**Returns:**

this

This instance for chaining.

## Remarks

_Type alias for ._

## Example


```ts
expect([1,2,3]).to.be.an.array().that.startsWith([1,2]);
```
