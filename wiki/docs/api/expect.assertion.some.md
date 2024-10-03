---
id: expect.assertion.some
title: Assertion.some() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [some](./expect.assertion.some.md)

## Assertion.some() method

Asserts that at least one element in the array satisfies the specified [Filter](./expect.filter.md)<!-- -->.

**Signature:**

```typescript
some(condition: Filter<InferArrayElement<T>>): this;
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

condition


</td><td>

[Filter](./expect.filter.md)<!-- -->&lt;[InferArrayElement](./expect.inferarrayelement.md)<!-- -->&lt;T&gt;&gt;


</td><td>

A callback that returns `true` whenever the condition is met.


</td></tr>
</tbody></table>
**Returns:**

this

## Example


```ts
expect(["Daymon", "Bryan"]).to.have.some(it => startsWith(it, "Bry"));
expect([1,3,5]).to.not.have.some(it => it % 2 === 0);
```
