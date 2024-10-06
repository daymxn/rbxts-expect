---
id: expect.assertion.enum_2
title: Assertion.enum() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [enum](./expect.assertion.enum_2.md)

## Assertion.enum() method

Asserts that the value is an enum of type `R`<!-- -->, and equal to the `value`<!-- -->.

**Signature:**

```typescript
enum<R>(enumType: R & Record<number, string>, value: keyof R): Assertion<EnumValue<R>>;
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
<tr><td>

value


</td><td>

keyof R


</td><td>

The expected value of the defined enum type, as a key string.


</td></tr>
</tbody></table>
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;[EnumValue](./expect.enumvalue.md)<!-- -->&lt;R&gt;&gt;

## Remarks

This is _not_ for ROBLOX specific enums, but for _user_ defined enums.

The reason you would use this over [equal](./expect.assertion.shallowequal.md)<!-- -->, is that `enum` not only throws more descriptive errors about enums, but it also attaches the [enum_type](./expect.assertion.enum_type.md) property for chained methods to provide their own more descriptive errors about enums.

## Example


```ts
enum Sport {
  Basketball,
  Football,
  Soccer
}

expect(Sport.Basketball).to.be.the.enum(Sport, "Basketball");
expect("Basketball").to.be.the.enum(Sport, "Basketball");
expect(0).to.be.the.enum(Sport, "Basketball");
```
