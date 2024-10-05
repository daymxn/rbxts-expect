---
id: expect
title: expect package
hide_title: true
---


## expect package

Test-agnostic assertion library for ROBLOX.

## Remarks

Exports the [expect()](./expect.expect.md) method as the primary entry point.

## Classes

<table><thead><tr><th>

Class


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[ExpectMessageBuilder](./expect.expectmessagebuilder.md)


</td><td>

Builder for creating messages in an [expect()](./expect.expect.md) method.


</td></tr>
</tbody></table>

## Functions

<table><thead><tr><th>

Function


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[computeFullProxyPath(proxy)](./expect.computefullproxypath.md)


</td><td>

Recursively resolves the [path](./expect.proxyinstance._proxy_path.md) and [parent](./expect.proxyinstance._proxy_parent.md) of a [Proxy](./expect.proxy.md) to create a full path from the root.


</td></tr>
<tr><td>

[createProxy(value, parent, path)](./expect.createproxy.md)


</td><td>

Creates a [Proxy](./expect.proxy.md) around a `value`<!-- -->.


</td></tr>
<tr><td>

[err(callback, messages)](./expect.err.md)


</td><td>

Helper function for testing [expect error messages](./expect.expectmessagebuilder.md)<!-- -->.

Throws an error if the `callback` doesn't throw.


</td></tr>
<tr><td>

[expect(value)](./expect.expect.md)


</td><td>

Perform assertions/checks on the state of a value.


</td></tr>
<tr><td>

[extendMethods(methods)](./expect.extendmethods.md)


</td><td>

Adds additional methods to [expect()](./expect.expect.md)<!-- -->.


</td></tr>
<tr><td>

[extendNegations(methods)](./expect.extendnegations.md)


</td><td>

Add additional negations to [expect()](./expect.expect.md)<!-- -->.


</td></tr>
<tr><td>

[extendNOPs(methods)](./expect.extendnops.md)


</td><td>

Add additional NOOPs to [expect()](./expect.expect.md)<!-- -->.


</td></tr>
<tr><td>

[getDefaultExpectConfig()](./expect.getdefaultexpectconfig.md)


</td><td>

Gets the (current) default [ExpectConfig](./expect.expectconfig.md)<!-- -->.


</td></tr>
<tr><td>

[getProxyParent(proxy)](./expect.getproxyparent.md)


</td><td>

Safely gets the [parent](./expect.proxyinstance._proxy_parent.md) of a proxy, without triggering any metamethods.


</td></tr>
<tr><td>

[getProxyPath(proxy)](./expect.getproxypath.md)


</td><td>

Safely gets the [path](./expect.proxyinstance._proxy_path.md) of a proxy, without triggering any metamethods.


</td></tr>
<tr><td>

[getProxyValue(proxy)](./expect.getproxyvalue.md)


</td><td>

Safely gets the [value](./expect.proxyinstance._proxy_value.md) of a proxy, without triggering any metamethods.


</td></tr>
<tr><td>

[isProxy(value)](./expect.isproxy.md)


</td><td>

Type guard for [Proxy](./expect.proxy.md) values.


</td></tr>
<tr><td>

[resetDefaultExpectConfig()](./expect.resetdefaultexpectconfig.md)


</td><td>

Resets the default [ExpectConfig](./expect.expectconfig.md)<!-- -->.


</td></tr>
<tr><td>

[setDefaultExpectConfig(config)](./expect.setdefaultexpectconfig.md)


</td><td>

Sets the default [ExpectConfig](./expect.expectconfig.md)<!-- -->.


</td></tr>
<tr><td>

[withProxy(value, callback)](./expect.withproxy.md)


</td><td>

Creates a [Proxy](./expect.proxy.md) around a `value`<!-- -->, and calls the `callback` with it.


</td></tr>
</tbody></table>

## Interfaces

<table><thead><tr><th>

Interface


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[ActualPlaceholder](./expect.actualplaceholder.md)


</td><td>

The "actual" variable in an [expect()](./expect.expect.md) statement.


</td></tr>
<tr><td>

[Assertion](./expect.assertion.md)


</td><td>

Parent interface for all [expect()](./expect.expect.md) calls.


</td></tr>
<tr><td>

[ExpectConfig](./expect.expectconfig.md)


</td><td>

Configuration setting for [expect()](./expect.expect.md)<!-- -->.

Configuration is generally used inline as needed, as the concept of `expect` instances doesn't really exist.


</td></tr>
<tr><td>

[ExpectedPlaceholder](./expect.expectedplaceholder.md)


</td><td>

The "expected" variable in an [expect()](./expect.expect.md) statement.


</td></tr>
<tr><td>

[ExpectMessageBuilderOptions](./expect.expectmessagebuilderoptions.md)


</td><td>

Configuration options for instances of [ExpectMessageBuilder](./expect.expectmessagebuilder.md)<!-- -->.


</td></tr>
<tr><td>

[Placeholder](./expect.placeholder.md)


</td><td>

Utility interface for specifying dynamic variables in [expect error messages](./expect.expectmessagebuilder.md)<!-- -->.


</td></tr>
<tr><td>

[ProxyInstance](./expect.proxyinstance.md)


</td><td>

The data attached to a [Proxy](./expect.proxy.md)<!-- -->.


</td></tr>
<tr><td>

[VariableData](./expect.variabledata.md)


</td><td>

Data about the variables in an expect statement.


</td></tr>
</tbody></table>

## Variables

<table><thead><tr><th>

Variable


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[place](./expect.place.md)


</td><td>

Utility constant for specifying dynamic variables in [expect error messages](./expect.expectmessagebuilder.md)<!-- -->.


</td></tr>
</tbody></table>

## Type Aliases

<table><thead><tr><th>

Type Alias


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[CustomMethodImpl](./expect.custommethodimpl.md)


</td><td>

The implementation of a [expect()](./expect.expect.md) method.


</td></tr>
<tr><td>

[CustomMethodImpls](./expect.custommethodimpls.md)


</td><td>

An object of [expect()](./expect.expect.md) method names to [implementations](./expect.custommethodimpl.md)<!-- -->.


</td></tr>
<tr><td>

[EnumValue](./expect.enumvalue.md)


</td><td>

The value of an enum in a [LuaEnum](./expect.luaenum.md)<!-- -->.


</td></tr>
<tr><td>

[ExpectMethodResult](./expect.expectmethodresult.md)


</td><td>

The result of an [expect()](./expect.expect.md) method call.


</td></tr>
<tr><td>

[Filter](./expect.filter.md)


</td><td>

Callback for deciding if a `value` satisfies a condition.


</td></tr>
<tr><td>

[InferArrayElement](./expect.inferarrayelement.md)


</td><td>

Helper type for inferring the type of an array.


</td></tr>
<tr><td>

[LuaEnum](./expect.luaenum.md)


</td><td>

A user-defined enum, as it would be defined in the transpiled Lua.


</td></tr>
<tr><td>

[Proxy](./expect.proxy.md)


</td><td>

A wrapper around a value `T` that provides meta context on index access.


</td></tr>
<tr><td>

[TypeCheckCallback](./expect.typecheckcallback.md)


</td><td>

Callback for deciding if a `value` matches a given type `T`<!-- -->.


</td></tr>
</tbody></table>