---
id: expect.placeholder
title: Placeholder interface
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Placeholder](./expect.placeholder.md)

## Placeholder interface

Utility interface for specifying dynamic variables in [expect error messages](./expect.expectmessagebuilder.md)<!-- -->.

**Signature:**

```typescript
interface Placeholder 
```

## Remarks

At [build time](./expect.expectmessagebuilder.build.md)<!-- -->, the variables placed via this interface will be populated with their respective values.

This allows you to define a static string, while still specifying the location of certain variables—without needing to know their values.

## Example


```ts
new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} equal ${place.expected.value}`
);
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

[actual](./expect.placeholder.actual.md)


</td><td>


</td><td>

[ActualPlaceholder](./expect.actualplaceholder.md)


</td><td>

The "actual" variable in an [expect()](./expect.expect.md) statement.


</td></tr>
<tr><td>

[expected](./expect.placeholder.expected.md)


</td><td>


</td><td>

[ExpectedPlaceholder](./expect.expectedplaceholder.md)


</td><td>

The "expected" variable in an [expect()](./expect.expect.md) statement.


</td></tr>
<tr><td>

[index](./expect.placeholder.index.md)


</td><td>


</td><td>

string


</td><td>

A placeholder for array [indices](./expect.placeholder.index.md)<!-- -->.


</td></tr>
<tr><td>

[name](./expect.placeholder.name.md)


</td><td>


</td><td>

string


</td><td>

A utility placeholder for either the [path](./expect.placeholder.path.md)<!-- -->, or the [actual value](./expect.placeholder.actual.md)<!-- -->.

Messages can configure their own names as well.


</td></tr>
<tr><td>

[nil](./expect.placeholder.nil.md)


</td><td>


</td><td>

string


</td><td>

A placeholder for the word `"nil"`<!-- -->.


</td></tr>
<tr><td>

[not](./expect.placeholder.not.md)


</td><td>


</td><td>

string


</td><td>

A placeholder for the word `"NOT"`<!-- -->, that will only be populated when the assertion is [negated](./expect.assertion.not.md)<!-- -->.


</td></tr>
<tr><td>

[path](./expect.placeholder.path.md)


</td><td>


</td><td>

string


</td><td>

A utility placeholder the path on nested variables.


</td></tr>
<tr><td>

[reason](./expect.placeholder.reason.md)


</td><td>


</td><td>

string


</td><td>

A utility placeholder for describing why the check failed.


</td></tr>
<tr><td>

[undefined](./expect.placeholder.undefined.md)


</td><td>


</td><td>

string


</td><td>

A placeholder for the word `"nil"`<!-- -->.


</td></tr>
</tbody></table>