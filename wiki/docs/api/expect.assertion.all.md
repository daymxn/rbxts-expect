---
id: expect.assertion.all
title: Assertion.all() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [all](./expect.assertion.all.md)

## Assertion.all() method

Asserts that all elements in the array satisfy the specified [Filter](./expect.filter.md)<!-- -->.

**Signature:**

```typescript
all(condition: Filter<InferArrayElement<T>>): this;
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
expect(["Bryce", "Bryan"]).to.all(it => startsWith(it, "Bry"));
expect([1,3,4,5]).to.not.all(it => it % 2 === 0);
```
