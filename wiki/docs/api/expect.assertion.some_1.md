---
id: expect.assertion.some_1
title: Assertion.some() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [some](./expect.assertion.some_1.md)

## Assertion.some() method

Asserts that at least one element in the array satisfies the specified [Filter](./expect.filter.md)<!-- -->.

**Signature:**

```typescript
some(reason: string, condition: Filter<InferArrayElement<T>>): this;
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

reason


</td><td>

string


</td><td>

A [reason](./expect.placeholder.reason.md) to add at the end of the message for additional context.


</td></tr>
<tr><td>

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
expect(["Daymon", "Bryan"]).to.have.some("starts with bry", it => startsWith(it, "Bry"));
expect([1,3,5]).to.not.have.some("are even", it => it % 2 === 0);
```
Example message:

```logs
Expected '[1,2,3]' to NOT have any elements that are even, but it did at index '2'

Value of [2]: '2'
```
