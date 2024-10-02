---
id: expect.actualplaceholder
title: ActualPlaceholder interface
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ActualPlaceholder](./expect.actualplaceholder.md)

## ActualPlaceholder interface

The "actual" variable in an [expect()](./expect.expect.md) statement.

**Signature:**

```typescript
interface ActualPlaceholder 
```

## Remarks

This is the first variable passed into [expect()](./expect.expect.md) when starting an assertion chain.

We refer to it as the "actual" variable, as it's a contrast to the [expected](./expect.placeholder.expected.md) variable.

_Note that you shouldn't use `actual` directly in your messages, instead you should use one of the properties of this type._

## Example

Given the following assertion chain:

```ts
expect(5).to.equal(6);
```
The value `5` is the "actual" value/variable.

It's whatever you pass to `expect` when calling it initially.

## Properties

<table><thead><tr><th>

Property


</th><th>

Modifiers


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[fullValue](./expect.actualplaceholder.fullvalue.md)


</td><td>


</td><td>

string


</td><td>

The "actual" value in an [expect()](./expect.expect.md) statement, which is _not_ [collapsed](./expect.expectconfig.collapselength.md)<!-- -->.


</td></tr>
<tr><td>

[type](./expect.actualplaceholder.type.md)


</td><td>


</td><td>

string


</td><td>

A string representing the type of the [actual value](./expect.actualplaceholder.value.md) in an [expect()](./expect.expect.md) statement.


</td></tr>
<tr><td>

[value](./expect.actualplaceholder.value.md)


</td><td>


</td><td>

string


</td><td>

The "actual" value in an [expect()](./expect.expect.md) statement, which can optionally be [collapsed](./expect.expectconfig.collapselength.md)<!-- -->.


</td></tr>
</tbody></table>