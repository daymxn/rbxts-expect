---
id: expect.assertion.length
title: Assertion.length() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [length](./expect.assertion.length.md)

## Assertion.length() method

Asserts that the value has a length of `size`<!-- -->.

**Signature:**

```typescript
length(size: number): this;
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

size


</td><td>

number


</td><td>

The length that the "actual" value should have.


</td></tr>
</tbody></table>
**Returns:**

this

This instance for chaining.

## Remarks

Works with strings or iterable types.

An object's size is measured by its keys.

A string's size is measured by its characters.

An iterable's size is measured by its elements.

## Example


```ts
expect([1,2,3]).to.have.a.length(3);
expect({ name: "Daymon", age: 5 }).to.have.a.length(2);
expect("Daymon").to.have.a.length(6);
```
