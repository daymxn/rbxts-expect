---
id: expect.assertion.startwith
title: Assertion.startWith() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [startWith](./expect.assertion.startwith.md)

## Assertion.startWith() method

Asserts that the array starts with the specified elements.

**Signature:**

```typescript
startWith(elements: InferArrayElement<T>[]): this;
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

## Example


```ts
expect([1,2,3]).to.startWith([1,2]);
```
