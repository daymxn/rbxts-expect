---
id: expect.assertion.containexactly
title: Assertion.containExactly() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [containExactly](./expect.assertion.containexactly.md)

## Assertion.containExactly() method

Asserts that the array contains all of the values in `expectedValues`<!-- -->, and nothing more or less.

**Signature:**

```typescript
containExactly(expectedValues: InferArrayElement<T>[]): this;
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

Order doesn't matter, so long as the actual array has the same values as the expected array.

There shouldn't be any extra elements in the actual array either; both arrays should **deeply** contain the same elements, with no regard to the ordering of elements.

## Example


```ts
expect([1,2,3]).to.containExactly([2,1,3]);
expect([1,2]).to.not.containExactly([1,2,3]);
expect([1,2,3]).to.not.containExactly([1,2]);
```
