---
id: expect.assertion.containexactlyinorder
title: Assertion.containExactlyInOrder() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [containExactlyInOrder](./expect.assertion.containexactlyinorder.md)

## Assertion.containExactlyInOrder() method

Asserts that the array contains all of the values in `expectedValues`<!-- -->, with nothing more or less, and in the same order.

**Signature:**

```typescript
containExactlyInOrder(expectedValues: InferArrayElement<T>[]): this;
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

expectedValues


</td><td>

[InferArrayElement](./expect.inferarrayelement.md)<!-- -->&lt;T&gt;\[\]


</td><td>

An array of elements that the actual array should be.


</td></tr>
</tbody></table>
**Returns:**

this

## Remarks

There shouldn't be any extra elements in the actual array; both arrays should **deeply** contain the same elements, and in the same order.

## Example


```ts
expect([1,2,3]).to.containExactlyInOrder([1,2,3]);
expect([1,2,3]).to.not.containExactlyInOrder([1,3,2]);
```
