---
id: expect.assertion.matchexactly
title: Assertion.matchExactly() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [matchExactly](./expect.assertion.matchexactly.md)

## Assertion.matchExactly() method

Asserts that the value is _deep_ equal to the `expectedValue`<!-- -->.

**Signature:**

```typescript
matchExactly<R = T>(expectedValue: R): Assertion<R>;
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
