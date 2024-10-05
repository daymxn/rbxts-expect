---
id: expect.assertion.match
title: Assertion.match() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [match](./expect.assertion.match.md)

## Assertion.match() method

Asserts that the actual value has the same properties and values as the `expected`<!-- -->.

**Signature:**

```typescript
match<R extends object>(expected: R): Assertion<R & T>;
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

expected


</td><td>

R


</td><td>


</td></tr>
</tbody></table>
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;R &amp; T&gt;

## Remarks

Very similar to [deepEqual](./expect.assertion.deepequal.md)<!-- -->, but this only applies one way; it doesn't fail if there are extra keys.

Can be used to only check a collection of certain keys and their respective values.

## Example


```ts
expect({
  name: "daymon",
  age: 24
  children: [{
    name: "michael",
    age: 4
  }]
}).to.match({ age: 24 });
```
