---
id: expect.assertion.satisfy
title: Assertion.satisfy() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [satisfy](./expect.assertion.satisfy.md)

## Assertion.satisfy() method

Asserts that the value returns true for the given `filter`<!-- -->.

**Signature:**

```typescript
satisfy(filter: Filter<T>): this;
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

If the passed `filter` is a named function, the function's name will be used in the failure messages.

## Example


```ts
expect(5).to.satisfy((it) => it >= 0);
```
