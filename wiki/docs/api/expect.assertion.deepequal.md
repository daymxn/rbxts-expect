---
id: expect.assertion.deepequal
title: Assertion.deepEqual() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [deepEqual](./expect.assertion.deepequal.md)

## Assertion.deepEqual() method

Asserts that the value is _deep_ equal to the `expectedValue`<!-- -->.

**Signature:**

```typescript
deepEqual<R = T>(expectedValue: R): Assertion<R>;
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

expectedValue


</td><td>

R


</td><td>


</td></tr>
</tbody></table>
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;R&gt;

## Remarks

The deep equal comparison is done via the [rbxts-deep-equal](https://github.com/daymxn/rbxts-deep-equal) library, and supports _most_ roblox data types, as well as nested tables and recursive self references.

Will check for missing keys, different types, different values, reference types, and so forth; throwing a unique message depending on the context.

Can also be used to compare arrays, and other objects.

## Example


```ts
expect([1,2,3]).to.deepEqual([1,2,3]);
expect({
  name: "daymon",
  age: 24
  children: [{
    name: "michael",
    age: 4
  }]
}).to.deepEqual({
  name: "daymon",
  age: 24
  children: [{
    name: "michael",
    age: 4
  }]
});
```
