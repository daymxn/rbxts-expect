---
id: expect.assertion.instanceof_1
title: Assertion.instanceOf() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [instanceOf](./expect.assertion.instanceof_1.md)

## Assertion.instanceOf() method

Asserts that the value is an instance of `I`<!-- -->, according to a custom callback [TypeCheckCallback](./expect.typecheckcallback.md)<!-- -->.

**Signature:**

```typescript
instanceOf<I>(checker: TypeCheckCallback<T>): Assertion<I>;
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

[TypeCheckCallback](./expect.typecheckcallback.md)<!-- -->&lt;T&gt;


</td><td>


</td></tr>
</tbody></table>
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;I&gt;

## Example


```ts
const isNumber: TypeCheckCallback = (value) => {
  return typeOf(value) === "number";
}

expect(1).to.be.an.instanceOf(isNumber);
```
