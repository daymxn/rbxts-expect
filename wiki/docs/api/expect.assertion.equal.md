---
id: expect.assertion.equal
title: Assertion.equal() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [equal](./expect.assertion.equal.md)

## Assertion.equal() method

Asserts that the value is _shallow_ equal to the `expectedValue`<!-- -->.

**Signature:**

```typescript
equal<R = T>(expectedValue: R): Assertion<R>;
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
expect(5).to.equal(5);
expect("daymon").to.not.equal("bryan");
```
