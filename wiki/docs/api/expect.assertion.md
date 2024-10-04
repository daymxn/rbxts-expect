---
id: expect.assertion
title: Assertion interface
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md)

## Assertion interface

Parent interface for all [expect()](./expect.expect.md) calls.

**Signature:**

```typescript
interface Assertion<T = unknown> 
```

## Remarks

When a call to [expect()](./expect.expect.md) is made, the returned value is an instance of _this_ interface.

It provides a common means for all the methods to be attached.

You can think of it as an instance of [expect()](./expect.expect.md)<!-- -->, or a controller of sorts.

Although, [expect()](./expect.expect.md) is designed with the idea of call-when-you-need in mind. That is, it's not expected that you'd save the result of an [expect()](./expect.expect.md) call, and then re-call it at some point down the line.

For example:

```ts
// DONT do this
const assertion = expect(5);
assertion.to.be.number();
assertion.to.equal(5);

// Do this
expect(5).to.be.a.number().that.equals(5);

// Or this
const actual = 5;
expect(actual).to.be.a.number();
expect(actual).to.equal(5);
```

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

[a](./expect.assertion.a.md)


</td><td>

`readonly`


</td><td>

this


</td><td>

NOOP property for cleaner chaining; does nothing.


</td></tr>
<tr><td>

[also](./expect.assertion.also.md)


</td><td>

`readonly`


</td><td>

this


</td><td>

NOOP property for cleaner chaining; does nothing.


</td></tr>
<tr><td>

[an](./expect.assertion.an.md)


</td><td>

`readonly`


</td><td>

this


</td><td>

NOOP property for cleaner chaining; does nothing.


</td></tr>
<tr><td>

[and](./expect.assertion.and.md)


</td><td>

`readonly`


</td><td>

this


</td><td>

NOOP property for cleaner chaining; does nothing.


</td></tr>
<tr><td>

[at](./expect.assertion.at.md)


</td><td>

`readonly`


</td><td>

this


</td><td>

NOOP property for cleaner chaining; does nothing.


</td></tr>
<tr><td>

[be](./expect.assertion.be.md)


</td><td>

`readonly`


</td><td>

this


</td><td>

NOOP property for cleaner chaining; does nothing.


</td></tr>
<tr><td>

[been](./expect.assertion.been.md)


</td><td>

`readonly`


</td><td>

this


</td><td>

NOOP property for cleaner chaining; does nothing.


</td></tr>
<tr><td>

[but](./expect.assertion.but.md)


</td><td>

`readonly`


</td><td>

this


</td><td>

NOOP property for cleaner chaining; does nothing.


</td></tr>
<tr><td>

[does](./expect.assertion.does.md)


</td><td>

`readonly`


</td><td>

this


</td><td>

NOOP property for cleaner chaining; does nothing.


</td></tr>
<tr><td>

[enum_type?](./expect.assertion.enum_type.md)


</td><td>


</td><td>

Record&lt;number, string&gt;


</td><td>

_(Optional)_ Helper property for getting the mappings for a value that has passed an  check.


</td></tr>
<tr><td>

[have](./expect.assertion.have.md)


</td><td>

`readonly`


</td><td>

this


</td><td>

NOOP property for cleaner chaining; does nothing.


</td></tr>
<tr><td>

[is_array?](./expect.assertion.is_array.md)


</td><td>


</td><td>

boolean


</td><td>

_(Optional)_ Helper property for checking if a value has already passed an  check.


</td></tr>
<tr><td>

[is](./expect.assertion.is.md)


</td><td>

`readonly`


</td><td>

this


</td><td>

NOOP property for cleaner chaining; does nothing.


</td></tr>
<tr><td>

[never](./expect.assertion.never.md)


</td><td>

`readonly`


</td><td>

this


</td><td>

Negates the assertion.


</td></tr>
<tr><td>

[not](./expect.assertion.not.md)


</td><td>

`readonly`


</td><td>

this


</td><td>

Negates the assertion.


</td></tr>
<tr><td>

[of](./expect.assertion.of.md)


</td><td>

`readonly`


</td><td>

this


</td><td>

NOOP property for cleaner chaining; does nothing.


</td></tr>
<tr><td>

[or](./expect.assertion.or.md)


</td><td>

`readonly`


</td><td>

this


</td><td>

NOOP property for cleaner chaining; does nothing.


</td></tr>
<tr><td>

[still](./expect.assertion.still.md)


</td><td>

`readonly`


</td><td>

this


</td><td>

NOOP property for cleaner chaining; does nothing.


</td></tr>
<tr><td>

[that](./expect.assertion.that.md)


</td><td>

`readonly`


</td><td>

this


</td><td>

NOOP property for cleaner chaining; does nothing.


</td></tr>
<tr><td>

[the](./expect.assertion.the.md)


</td><td>

`readonly`


</td><td>

this


</td><td>

NOOP property for cleaner chaining; does nothing.


</td></tr>
<tr><td>

[to](./expect.assertion.to.md)


</td><td>

`readonly`


</td><td>

this


</td><td>

NOOP property for cleaner chaining; does nothing.


</td></tr>
<tr><td>

[value](./expect.assertion.value.md)


</td><td>

`readonly`


</td><td>

T


</td><td>

The "actual" value attached to this [expect()](./expect.expect.md) call.


</td></tr>
<tr><td>

[which](./expect.assertion.which.md)


</td><td>

`readonly`


</td><td>

this


</td><td>

NOOP property for cleaner chaining; does nothing.


</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[above(value)](./expect.assertion.above.md)


</td><td>

Asserts that the value is greater than `value`<!-- -->.


</td></tr>
<tr><td>

[anyOf(values)](./expect.assertion.anyof.md)


</td><td>

Asserts that the value is _shallow_ equal to any of the provided `values`<!-- -->.


</td></tr>
<tr><td>

[array()](./expect.assertion.array.md)


</td><td>

Asserts that the value is an array.


</td></tr>
<tr><td>

[array(typeName)](./expect.assertion.array_1.md)


</td><td>

Asserts that the value is an array of type `typeName`<!-- -->.


</td></tr>
<tr><td>

[array(checker)](./expect.assertion.array_2.md)


</td><td>

Asserts that the value is an array of type `I`<!-- -->, according to a custom callback [TypeCheckCallback](./expect.typecheckcallback.md)<!-- -->.


</td></tr>
<tr><td>

[array(tChecker)](./expect.assertion.array_3.md)


</td><td>

Asserts that the value is an array of type `I`<!-- -->, according to a provided [t check](https://github.com/osyrisrblx/t)<!-- -->.


</td></tr>
<tr><td>

[arrayOf(typeName)](./expect.assertion.arrayof.md)


</td><td>

Asserts that the value is an array of type `typeName`<!-- -->.


</td></tr>
<tr><td>

[arrayOf(checker)](./expect.assertion.arrayof_1.md)


</td><td>

Asserts that the value is an array of type `I`<!-- -->, according to a custom callback [TypeCheckCallback](./expect.typecheckcallback.md)<!-- -->.


</td></tr>
<tr><td>

[arrayOf(tChecker)](./expect.assertion.arrayof_2.md)


</td><td>

Asserts that the value is an array of type `I`<!-- -->, according to a provided [t check](https://github.com/osyrisrblx/t)<!-- -->.


</td></tr>
<tr><td>

[below(value)](./expect.assertion.below.md)


</td><td>

Asserts that the value is less than `value`<!-- -->.


</td></tr>
<tr><td>

[boolean()](./expect.assertion.boolean.md)


</td><td>

Asserts that the value is a [boolean](https://create.roblox.com/docs/luau/booleans)<!-- -->.


</td></tr>
<tr><td>

[containExactly(expectedValues)](./expect.assertion.containexactly.md)


</td><td>

Asserts that the array contains all of the values in `expectedValues`<!-- -->, and nothing more or less.


</td></tr>
<tr><td>

[containExactlyInOrder(expectedValues)](./expect.assertion.containexactlyinorder.md)


</td><td>

Asserts that the array contains all of the values in `expectedValues`<!-- -->, with nothing more or less, and in the same order.


</td></tr>
<tr><td>

[containsExactly(expectedValues)](./expect.assertion.containsexactly.md)


</td><td>

Asserts that the array contains all of the values in `expectedValues`<!-- -->, and nothing more or less.


</td></tr>
<tr><td>

[containsExactlyInOrder(expectedValues)](./expect.assertion.containsexactlyinorder.md)


</td><td>

Asserts that the array contains all of the values in `expectedValues`<!-- -->, with nothing more or less, and in the same order.


</td></tr>
<tr><td>

[deepEqual(expectedValue)](./expect.assertion.deepequal.md)


</td><td>

Asserts that the value is _deep_ equal to the `expectedValue`<!-- -->.


</td></tr>
<tr><td>

[deepEquals(expectedValue)](./expect.assertion.deepequals.md)


</td><td>

Asserts that the value is _deep_ equal to the `expectedValue`<!-- -->.


</td></tr>
<tr><td>

[empty()](./expect.assertion.empty.md)


</td><td>

Asserts that the value is empty.


</td></tr>
<tr><td>

[enum(enumType)](./expect.assertion.enum.md)


</td><td>

Asserts that the value is an enum of type `R`<!-- -->.


</td></tr>
<tr><td>

[enum(enumType, value)](./expect.assertion.enum_1.md)


</td><td>

Asserts that the value is an enum of type `R`<!-- -->, and equal to the `value`<!-- -->.


</td></tr>
<tr><td>

[enum(enumType, value)](./expect.assertion.enum_2.md)


</td><td>

Asserts that the value is an enum of type `R`<!-- -->, and equal to the `value`<!-- -->.


</td></tr>
<tr><td>

[eq(expectedValue)](./expect.assertion.eq.md)


</td><td>

Asserts that the value is _shallow_ equal to the `expectedValue`<!-- -->.


</td></tr>
<tr><td>

[eql(expectedValue)](./expect.assertion.eql.md)


</td><td>

Asserts that the value is _deep_ equal to the `expectedValue`<!-- -->.


</td></tr>
<tr><td>

[equal(expectedValue)](./expect.assertion.equal.md)


</td><td>

Asserts that the value is _shallow_ equal to the `expectedValue`<!-- -->.


</td></tr>
<tr><td>

[equals(expectedValue)](./expect.assertion.equals.md)


</td><td>

Asserts that the value is _shallow_ equal to the `expectedValue`<!-- -->.


</td></tr>
<tr><td>

[function()](./expect.assertion.function.md)


</td><td>

Asserts that the value is a [function](https://create.roblox.com/docs/luau/functions)<!-- -->.


</td></tr>
<tr><td>

[greaterThan(value)](./expect.assertion.greaterthan.md)


</td><td>

Asserts that the value is greater than `value`<!-- -->.


</td></tr>
<tr><td>

[greaterThanOrEqualTo(value)](./expect.assertion.greaterthanorequalto.md)


</td><td>

Asserts that the value is greater than or equal to `value`<!-- -->.


</td></tr>
<tr><td>

[gt(value)](./expect.assertion.gt.md)


</td><td>

Asserts that the value is greater than `value`<!-- -->.


</td></tr>
<tr><td>

[gte(value)](./expect.assertion.gte.md)


</td><td>

Asserts that the value is greater than or equal to `value`<!-- -->.


</td></tr>
<tr><td>

[include(expectedValue)](./expect.assertion.include.md)


</td><td>

Asserts that the `expectedValue` is a value in the array.


</td></tr>
<tr><td>

[includes(expectedValue)](./expect.assertion.includes.md)


</td><td>

Asserts that the `expectedValue` is a value in the array.


</td></tr>
<tr><td>

[instanceOf(name)](./expect.assertion.instanceof.md)


</td><td>

Asserts that the value is an instance of type `typeName`<!-- -->.


</td></tr>
<tr><td>

[instanceOf(checker)](./expect.assertion.instanceof_1.md)


</td><td>

Asserts that the value is an instance of `I`<!-- -->, according to a custom callback [TypeCheckCallback](./expect.typecheckcallback.md)<!-- -->.


</td></tr>
<tr><td>

[instanceOf(tChecker)](./expect.assertion.instanceof_2.md)


</td><td>

Asserts that the value is an instance of `I`<!-- -->, according to a provided [t check](https://github.com/osyrisrblx/t)<!-- -->.


</td></tr>
<tr><td>

[least(value)](./expect.assertion.least.md)


</td><td>

Asserts that the value is greater than or equal to `value`<!-- -->.


</td></tr>
<tr><td>

[length(size)](./expect.assertion.length.md)


</td><td>

Asserts that the value has a length of `size`<!-- -->.


</td></tr>
<tr><td>

[lengthOf(size)](./expect.assertion.lengthof.md)


</td><td>

Asserts that the value has a length of `size`<!-- -->.


</td></tr>
<tr><td>

[lessThan(value)](./expect.assertion.lessthan.md)


</td><td>

Asserts that the value is less than `value`<!-- -->.


</td></tr>
<tr><td>

[lessThanOrEqualTo(value)](./expect.assertion.lessthanorequalto.md)


</td><td>

Asserts that the value is less than or equal to `value`<!-- -->.


</td></tr>
<tr><td>

[lt(value)](./expect.assertion.lt.md)


</td><td>

Asserts that the value is less than `value`<!-- -->.


</td></tr>
<tr><td>

[lte(value)](./expect.assertion.lte.md)


</td><td>

Asserts that the value is less than or equal to `value`<!-- -->.


</td></tr>
<tr><td>

[most(value)](./expect.assertion.most.md)


</td><td>

Asserts that the value is less than or equal to `value`<!-- -->.


</td></tr>
<tr><td>

[number()](./expect.assertion.number.md)


</td><td>

Asserts that the value is a [number](https://create.roblox.com/docs/luau/numbers)<!-- -->.


</td></tr>
<tr><td>

[object()](./expect.assertion.object.md)


</td><td>

Asserts that the value is a [table](https://create.roblox.com/docs/luau/tables)<!-- -->.


</td></tr>
<tr><td>

[oneOf(values)](./expect.assertion.oneof.md)


</td><td>

Asserts that the value is _shallow_ equal to one of the provided `values`<!-- -->.


</td></tr>
<tr><td>

[size(size)](./expect.assertion.size.md)


</td><td>

Asserts that the value has a length of `size`<!-- -->.


</td></tr>
<tr><td>

[sizeOf(size)](./expect.assertion.sizeof.md)


</td><td>

Asserts that the value has a length of `size`<!-- -->.


</td></tr>
<tr><td>

[some(condition)](./expect.assertion.some.md)


</td><td>

Asserts that at least one element in the array satisfies the specified [Filter](./expect.filter.md)<!-- -->.


</td></tr>
<tr><td>

[some(reason, condition)](./expect.assertion.some_1.md)


</td><td>

Asserts that at least one element in the array satisfies the specified [Filter](./expect.filter.md)<!-- -->.


</td></tr>
<tr><td>

[string()](./expect.assertion.string.md)


</td><td>

Asserts that the value is a [string](https://create.roblox.com/docs/luau/strings)<!-- -->.


</td></tr>
<tr><td>

[substring(str)](./expect.assertion.substring.md)


</td><td>

Asserts that the string value contains the string `str`<!-- -->.


</td></tr>
<tr><td>

[table()](./expect.assertion.table.md)


</td><td>

Asserts that the value is a [table](https://create.roblox.com/docs/luau/tables)<!-- -->.


</td></tr>
<tr><td>

[throw()](./expect.assertion.throw.md)


</td><td>

Asserts that the function throws an exception.


</td></tr>
<tr><td>

[throw(substring)](./expect.assertion.throw_1.md)


</td><td>

Asserts that the function throws an exception that contains the string `substring`<!-- -->.


</td></tr>
<tr><td>

[throwMatch(pattern)](./expect.assertion.throwmatch.md)


</td><td>

Asserts that the function throws an exception that matches the lua pattern `pattern`<!-- -->.


</td></tr>
<tr><td>

[throws()](./expect.assertion.throws.md)


</td><td>

Asserts that the function throws an exception.


</td></tr>
<tr><td>

[throws(substring)](./expect.assertion.throws_1.md)


</td><td>

Asserts that the function throws an exception that contains the string `substring`<!-- -->.


</td></tr>
<tr><td>

[throwsMatch(pattern)](./expect.assertion.throwsmatch.md)


</td><td>

Asserts that the function throws an exception that matches the lua pattern `pattern`<!-- -->.


</td></tr>
<tr><td>

[typeOf(name)](./expect.assertion.typeof.md)


</td><td>

Asserts that the value is of type `typeName`<!-- -->.


</td></tr>
<tr><td>

[typeOf(checker)](./expect.assertion.typeof_1.md)


</td><td>

Asserts that the value is of type `I`<!-- -->, according to a custom callback [TypeCheckCallback](./expect.typecheckcallback.md)<!-- -->.


</td></tr>
<tr><td>

[typeOf(tChecker)](./expect.assertion.typeof_2.md)


</td><td>

Asserts that the value is of type `I`<!-- -->, according to a provided [t check](https://github.com/osyrisrblx/t)<!-- -->.


</td></tr>
</tbody></table>