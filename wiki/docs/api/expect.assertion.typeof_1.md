---
id: expect.assertion.typeof_1
title: Assertion.typeOf() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [typeOf](./expect.assertion.typeof_1.md)

## Assertion.typeOf() method

Asserts that the value is of type `I`<!-- -->, according to a custom callback [TypeCheckCallback](./expect.typecheckcallback.md)<!-- -->.

**Signature:**

```typescript
typeOf<I>(checker: TypeCheckCallback<T>): Assertion<I>;
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

## Remarks

_Type alias for the `instanceOf` version of this._

## Example


```ts
const isNumber: TypeCheckCallback = (value) => {
  return typeOf(value) === "number";
}

expect(1).to.be.an.instanceOf(isNumber);
```
