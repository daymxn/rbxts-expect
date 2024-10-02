---
id: expect.expectedplaceholder
title: ExpectedPlaceholder interface
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectedPlaceholder](./expect.expectedplaceholder.md)

## ExpectedPlaceholder interface

The "expected" variable in an [expect()](./expect.expect.md) statement.

**Signature:**

```typescript
interface ExpectedPlaceholder 
```

## Remarks

This is _usually_ the value passed into an assertion method, but not all methods end up having an expected value.

For example, the [empty](./expect.assertion.empty.md) method doesn't have anything it's comparing the [actual](./expect.placeholder.actual.md) value to, so it doesn't have an "expected" value.

We refer to it as the "expected" variable, as it's _usually_ what you're expecting the [actual](./expect.placeholder.actual.md) variable to be.

_Note that you shouldn't use `expected` directly in your messages, instead you should use one of the properties of this type._

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

[fullValue](./expect.expectedplaceholder.fullvalue.md)


</td><td>


</td><td>

string


</td><td>

The "expected" value in an [expect()](./expect.expect.md) statement, which is _not_ [collapsed](./expect.expectconfig.collapselength.md)<!-- -->.


</td></tr>
<tr><td>

[type](./expect.expectedplaceholder.type.md)


</td><td>


</td><td>

string


</td><td>

A string representing the type of the [expected value](./expect.expectedplaceholder.value.md) in an [expect()](./expect.expect.md) statement.


</td></tr>
<tr><td>

[value](./expect.expectedplaceholder.value.md)


</td><td>


</td><td>

string


</td><td>

The "expected" value in an [expect()](./expect.expect.md) statement, which can optionally be [collapsed](./expect.expectconfig.collapselength.md)<!-- -->.


</td></tr>
</tbody></table>