---
id: expect.assertion.oneof
title: Assertion.oneOf() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [oneOf](./expect.assertion.oneof.md)

## Assertion.oneOf() method

Asserts that the value is _shallow_ equal to one of the provided `values`<!-- -->.

**Signature:**

```typescript
oneOf<R = T>(values: R[]): Assertion<R>;
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

values


</td><td>

R\[\]


</td><td>

An array of values to check for


</td></tr>
</tbody></table>
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;R&gt;

## Remarks

_Type alias for [anyOf](./expect.assertion.anyof.md)<!-- -->._
