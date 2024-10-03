---
id: expect.assertion.eql
title: Assertion.eql() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [eql](./expect.assertion.eql.md)

## Assertion.eql() method

Asserts that the value is _deep_ equal to the `expectedValue`<!-- -->.

**Signature:**

```typescript
eql<R = T>(expectedValue: R): Assertion<R>;
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

_Type alias for [deepEqual](./expect.assertion.deepequal.md)<!-- -->_
