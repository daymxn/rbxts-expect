---
id: expect.assertion.size
title: Assertion.size() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [size](./expect.assertion.size.md)

## Assertion.size() method

Asserts that the value has a length of `size`<!-- -->.

**Signature:**

```typescript
size(size: number): this;
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
expect([1,2,3]).to.have.the.size(3);
expect({ name: "Daymon", age: 5 }).to.have.the.size(2);
expect("Daymon").to.have.the.size(6);
```
