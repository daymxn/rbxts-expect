---
id: expect.assertion.satisfies
title: Assertion.satisfies() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [satisfies](./expect.assertion.satisfies.md)

## Assertion.satisfies() method

Asserts that the value returns true for the given `filter`<!-- -->.

**Signature:**

```typescript
satisfies(filter: Filter<T>): this;
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

filter


</td><td>

[Filter](./expect.filter.md)<!-- -->&lt;T&gt;


</td><td>

Callback that returns true if the value passes.


</td></tr>
</tbody></table>
**Returns:**

this

This instance for chaining.

## Remarks

_Type alias for [satisfy](./expect.assertion.satisfy.md)<!-- -->._

## Example


```ts
expect(5).to.be.a.number().that.satisfies((it) => it >= 0);
```
