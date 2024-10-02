---
id: expect.expectmessagebuilder
title: ExpectMessageBuilder class
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md)

## ExpectMessageBuilder class

Builder for creating messages in an [expect()](./expect.expect.md) method.

**Signature:**

```typescript
declare class ExpectMessageBuilder 
```

## Remarks

You can look at this class as a wrapper around the error messages a [method](./expect.custommethodimpl.md) can throw; while providing various utility features to make populating the message easier.

Depending on your method, you may end up not using most of what this class offers.

## Details

There are three (primary) components to an expect message:

1. The core contents of the message
 2. The [VariableData](./expect.variabledata.md) for "actual" and "expect"
 3. Various (optional) metadata


### Core Message

The "core" of a message is the content that's not populated by [placeholders](./expect.placeholder.md)<!-- -->.

Generally, this is static- but it doesn't have to be.

For example, given the message:

```logs
Expected '[1,2,3]' to be empty
```
The "core" part would be the `Expected to be empty`<!-- -->.

You can generally break this down into two components: the prefix and the suffix.

The prefix is usually static, and populated when you create your message:

```ts
new ExpectMessageBuilder(`Expected ${place.actual.value} to ${place.not} be empty`);
```
The "suffix" comes into play usually at runtime; where you have additional context.

```logs
Expected '[1,2,3]' to be empty, but it had 3 elements
```
In this case, `, but it had 3 elements` is the suffix.

### Variable Data

The [VariableData](./expect.variabledata.md) in a message corresponds to the data associated with a variable in the expression.

There are typically two variables: the "expected" variable, and the "actual" variable.

The "actual" variable is the one provided to [expect()](./expect.expect.md) when the statement starts.

The "expected" variable is the one provided to the method that's performing the check.

```ts
expect(5).to.not.equal("5");
```
In this case, `5` is the "actual" variable and `"5"` is the "expected" variable.

Although, some checks may not have an expected variable.

```ts
expect([]).to.be.empty();
```
In this case, `[]` is the "actual" variable, but there's nothing we're comparing it to so there's not really an "expected" variable.

### Metadata

The metadata in a message is additional data that follows after the message in the format of `key: value` with a newline for each.

```logs
Expected '[1,"2",3]' to be an array of type 'number', but there was an element of type 'number'.
Index: 1
Value: "2"
```
In this case, the metadata is the

```logs
Index: 1
Value: "2"
```

## Constructors

<table><thead><tr><th>

Constructor


</th><th>

Modifiers


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[(constructor)(prefix, negationPrefix, options)](./expect.expectmessagebuilder._constructor_.md)


</td><td>


</td><td>

Create a new instance of [ExpectMessageBuilder](./expect.expectmessagebuilder.md)<!-- -->.


</td></tr>
</tbody></table>

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

[options](./expect.expectmessagebuilder.options.md)


</td><td>

`readonly`


</td><td>

[ExpectMessageBuilderOptions](./expect.expectmessagebuilderoptions.md)


</td><td>

The [options](./expect.expectmessagebuilderoptions.md) configured to this instance.


</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method


</th><th>

Modifiers


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[actual(data)](./expect.expectmessagebuilder.actual.md)


</td><td>


</td><td>

Overwrites all the values for the [actual](./expect.placeholder.actual.md) variable.


</td></tr>
<tr><td>

[actualType(typeStr)](./expect.expectmessagebuilder.actualtype.md)


</td><td>


</td><td>

Sets a value to use for the .


</td></tr>
<tr><td>

[actualValue(value)](./expect.expectmessagebuilder.actualvalue.md)


</td><td>


</td><td>

Sets a value to use for the [actual value](./expect.actualplaceholder.value.md)<!-- -->.


</td></tr>
<tr><td>

[appendPrefix(str)](./expect.expectmessagebuilder.appendprefix.md)


</td><td>


</td><td>

Adds a string to the end of the existing prefix.


</td></tr>
<tr><td>

[build(pass, negated)](./expect.expectmessagebuilder.build.md)


</td><td>


</td><td>

Creates an error message to display, based on the data attached to this instance.


</td></tr>
<tr><td>

[copy()](./expect.expectmessagebuilder.copy.md)


</td><td>


</td><td>

Creates a deep copy of this instance.


</td></tr>
<tr><td>

[encode(value, valueType, overrideOptions, array, collapsable, collapseLength)](./expect.expectmessagebuilder.encode.md)


</td><td>


</td><td>

Encodes a `value` to a string, in the same way this instance would.


</td></tr>
<tr><td>

[expected(data)](./expect.expectmessagebuilder.expected.md)


</td><td>


</td><td>

Overwrites all the values for the [expected](./expect.placeholder.expected.md) variable.


</td></tr>
<tr><td>

[expectedType(typeStr)](./expect.expectmessagebuilder.expectedtype.md)


</td><td>


</td><td>

Sets a value to use for the .


</td></tr>
<tr><td>

[expectedValue(value)](./expect.expectmessagebuilder.expectedvalue.md)


</td><td>


</td><td>

Sets a value to use for the [expected value](./expect.expectedplaceholder.value.md)<!-- -->.


</td></tr>
<tr><td>

[fail()](./expect.expectmessagebuilder.fail.md)


</td><td>


</td><td>

Returns a `Result.err` of this instance.


</td></tr>
<tr><td>

[failureMetadata(data)](./expect.expectmessagebuilder.failuremetadata.md)


</td><td>


</td><td>

Attach data to follow after the main message, in the format of `key: value`<!-- -->.

Only attached when the message is a [failure](./expect.expectmessagebuilder.fail.md)<!-- -->.


</td></tr>
<tr><td>

[failWithReason(reason)](./expect.expectmessagebuilder.failwithreason.md)


</td><td>


</td><td>

Returns a [failure](./expect.expectmessagebuilder.fail.md) with the [reason](./expect.expectmessagebuilder.reason.md) attached.


</td></tr>
<tr><td>

[index(index)](./expect.expectmessagebuilder.index.md)


</td><td>


</td><td>

Sets a value for the [index](./expect.placeholder.index.md) placeholder.


</td></tr>
<tr><td>

[metadata(data)](./expect.expectmessagebuilder.metadata.md)


</td><td>


</td><td>

Attach data to follow after the main message, in the format of `key: value`<!-- -->.


</td></tr>
<tr><td>

[name(value)](./expect.expectmessagebuilder.name.md)


</td><td>


</td><td>

Sets a [name](./expect.placeholder.name.md) to use for the "actual" variable, when dealing with messages without [paths](./expect.expectmessagebuilder.path.md)<!-- -->.


</td></tr>
<tr><td>

[negationSuffix(str)](./expect.expectmessagebuilder.negationsuffix.md)


</td><td>


</td><td>

Adds a string to show at the end of the message, before the metadata.

Only applies if the message is [negated](./expect.assertion.not.md)<!-- -->.


</td></tr>
<tr><td>

[nestedMetadata(data)](./expect.expectmessagebuilder.nestedmetadata.md)


</td><td>


</td><td>

Attach data to follow after the main message, in the format of `key: value`<!-- -->.

Only attached when the message has a [path](./expect.placeholder.path.md)<!-- -->.


</td></tr>
<tr><td>

[pass()](./expect.expectmessagebuilder.pass.md)


</td><td>


</td><td>

Returns a `Result.ok` of this instance.


</td></tr>
<tr><td>

[path(str)](./expect.expectmessagebuilder.path.md)


</td><td>


</td><td>

Sets a [path](./expect.placeholder.path.md) to use for the "actual" variable, when dealing with nested tests.


</td></tr>
<tr><td>

[reason(reason)](./expect.expectmessagebuilder.reason.md)


</td><td>


</td><td>

Sets a value to use for the [reason](./expect.placeholder.reason.md)<!-- -->.


</td></tr>
<tr><td>

[suffix(str)](./expect.expectmessagebuilder.suffix.md)


</td><td>


</td><td>

Adds a string to show at the end of the message, before the metadata.


</td></tr>
<tr><td>

[surfaceMetadata(data)](./expect.expectmessagebuilder.surfacemetadata.md)


</td><td>


</td><td>

Attach data to follow after the main message, in the format of `key: value`<!-- -->.

Only attached when the message does NOT have a [path](./expect.placeholder.path.md)<!-- -->.


</td></tr>
<tr><td>

[toString()](./expect.expectmessagebuilder.tostring.md)


</td><td>


</td><td>

Returns a [built](./expect.expectmessagebuilder.build.md) copy of this message, assuming it passed and was NOT negated.


</td></tr>
<tr><td>

[trailingFailurePrefix(str)](./expect.expectmessagebuilder.trailingfailureprefix.md)


</td><td>


</td><td>

Adds a string to the end of the existing prefix, but only if it's a [failure](./expect.expectmessagebuilder.fail.md)<!-- -->.


</td></tr>
<tr><td>

[trailingFailureSuffix(str)](./expect.expectmessagebuilder.trailingfailuresuffix.md)


</td><td>


</td><td>

Adds a string to show at the end of the message, before the metadata.

Only applies if the message is a [failure](./expect.expectmessagebuilder.fail.md)<!-- -->.


</td></tr>
<tr><td>

[use(trailingPrefix, trailingFailurePrefix)](./expect.expectmessagebuilder.use.md)


</td><td>


</td><td>

Create a copy of this instance, to be populated with data.


</td></tr>
</tbody></table>