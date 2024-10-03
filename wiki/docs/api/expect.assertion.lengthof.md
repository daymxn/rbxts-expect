---
id: expect.assertion.lengthof
title: Assertion.lengthOf() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [lengthOf](./expect.assertion.lengthof.md)

## Assertion.lengthOf() method

Asserts that the value has a length of `size`<!-- -->.

**Signature:**

```typescript
lengthOf(size: number): this;
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


</td></tr>
</tbody></table>
**Returns:**

this

## Remarks

_Type alias for [length](./expect.assertion.length.md)<!-- -->._

## Example


```ts
expect([1,2,3]).to.have.a.lengthOf(3);
expect({ name: "Daymon", age: 5 }).to.have.a.lengthOf(2);
expect("Daymon").to.have.a.lengthOf(6);
```
