---
id: expect.assertion.array_2
title: Assertion.array() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [array](./expect.assertion.array_2.md)

## Assertion.array() method

Asserts that the value is an array of type `I`<!-- -->, according to a custom callback [TypeCheckCallback](./expect.typecheckcallback.md)<!-- -->.

**Signature:**

```typescript
array<I>(checker: TypeCheckCallback<I>): Assertion<I[]>;
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

checker


</td><td>

[TypeCheckCallback](./expect.typecheckcallback.md)<!-- -->&lt;I&gt;


</td><td>


</td></tr>
</tbody></table>
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;I\[\]&gt;

## Example


```ts
const isNumber: TypeCheckCallback = (value) => {
  return typeOf(value) === "number";
}

expect([1,2,3]).to.be.an.array(isNumber);
```
