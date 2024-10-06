---
id: expect.assertion.endwith
title: Assertion.endWith() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [endWith](./expect.assertion.endwith.md)

## Assertion.endWith() method

Asserts that the array ends with the specified elements.

**Signature:**

```typescript
endWith(elements: InferArrayElement<T>[]): this;
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

## Example


```ts
expect([1,2,3]).to.endWith([2,3]);
```
