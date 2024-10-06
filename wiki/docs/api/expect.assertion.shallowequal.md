---
id: expect.assertion.shallowequal
title: Assertion.shallowEqual() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [shallowEqual](./expect.assertion.shallowequal.md)

## Assertion.shallowEqual() method

Asserts that the value is _shallow_ equal to the `expectedValue`<!-- -->.

**Signature:**

```typescript
shallowEqual<R = T>(expectedValue: R): Assertion<R>;
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

A value is shallow equal if they pass according to `===`<!-- -->.

If you need to deeply check if values are equal, use [deepEqual](./expect.assertion.deepequal.md)<!-- -->.

## Example


```ts
expect(5).to.shallowEqual(5);
expect("daymon").to.not.shallowEqual("bryan");
```
