---
id: expect.assertion.enum
title: Assertion.enum() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [enum](./expect.assertion.enum.md)

## Assertion.enum() method

Asserts that the value is an enum of type `R`<!-- -->.

**Signature:**

```typescript
enum<R>(enumType: R & Record<number, string>): Assertion<EnumValue<R>>;
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

enumType


</td><td>

R &amp; Record&lt;number, string&gt;


</td><td>

A TS defined `enum` or an equivalent record in lua.


</td></tr>
</tbody></table>
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;[EnumValue](./expect.enumvalue.md)<!-- -->&lt;R&gt;&gt;

## Remarks

This is _not_ for ROBLOX specific enums, but for _user_ defined enums.

## Example


```ts
enum Sport {
  Basketball,
  Football,
  Soccer
}

expect(Sport.Basketball).to.be.the.enum(Sport);
expect("Basketball").to.be.the.enum(Sport);
expect(0).to.be.the.enum(Sport);
```
