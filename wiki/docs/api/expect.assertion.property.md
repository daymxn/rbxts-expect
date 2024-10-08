---
id: expect.assertion.property
title: Assertion.property() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [property](./expect.assertion.property.md)

## Assertion.property() method

Asserts that the table has the property `property`<!-- -->.

**Signature:**

```typescript
property(property: string): this;
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

property


</td><td>

string


</td><td>

Name of the property that the table should have.


</td></tr>
</tbody></table>
**Returns:**

this

This instance for chaining.

## Remarks

_Type alias for [key](./expect.assertion.key.md)<!-- -->._

## Example


```ts
expect({ name: "Daymon" }).to.have.the.property("name");
```
