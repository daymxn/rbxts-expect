---
id: expect.assertion.all_1
title: Assertion.all() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [all](./expect.assertion.all_1.md)

## Assertion.all() method

Asserts that all elements in the array satisfy the specified [Filter](./expect.filter.md)<!-- -->.

**Signature:**

```typescript
all(reason: string, condition: Filter<InferArrayElement<T>>): this;
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
expect(["Bryce", "Bryan"]).to.all('start with "Bry"', it => startsWith(it, "Bry"));
expect([1,3,4,5]).to.not.all('be even', it => it % 2 === 0);
```
Example message:

```logs
Expected '[1,2,3]' to all be even, but there was an element that failed the check

Index: 1
Value: '1'
```
