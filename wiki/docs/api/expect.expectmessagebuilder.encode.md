---
id: expect.expectmessagebuilder.encode
title: ExpectMessageBuilder.encode() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [encode](./expect.expectmessagebuilder.encode.md)

## ExpectMessageBuilder.encode() method

Encodes a `value` to a string, in the same way this instance would.

**Signature:**

```typescript
encode(value: unknown, valueType?: string, overrideOptions?: Partial<ExpectMessageBuilderOptions>, array?: boolean, collapsable?: boolean, collapseLength?: number): string;
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

value


</td><td>

unknown


</td><td>

The value of variable to encode.


</td></tr>
<tr><td>

valueType


</td><td>

string


</td><td>

_(Optional)_ A string representing the type of the variable to encode. Defaults to the `typeOf` of the `value`<!-- -->.


</td></tr>
<tr><td>

overrideOptions


</td><td>

Partial&lt;[ExpectMessageBuilderOptions](./expect.expectmessagebuilderoptions.md)<!-- -->&gt;


</td><td>

_(Optional)_ Provide overrides for the existing [options](./expect.expectmessagebuilder.options.md) on this instance.


</td></tr>
<tr><td>

array


</td><td>

boolean


</td><td>

_(Optional)_ Is the value an array? This is used for formatting purposes. Defaults to `false`<!-- -->.


</td></tr>
<tr><td>

collapsable


</td><td>

boolean


</td><td>

_(Optional)_ Should we collapse the value if it exceeds the `collapseLength`<!-- -->? Defaults to `false`<!-- -->.


</td></tr>
<tr><td>

collapseLength


</td><td>

number


</td><td>

_(Optional)_ Provide a length for when the string output should be collapsed. Defaults to the [collapseLength](./expect.expectconfig.collapselength.md) defined in the default config, at the time of the call.


</td></tr>
</tbody></table>
**Returns:**

string

A string that can be used in-place of the variable.

## Remarks

You won't generally need this, but it can come in handy when you need to display extra values, and want to ensure their format is the same as the [VariableData](./expect.variabledata.md) attached to this message.

Internally, this uses a local [weak table](https://www.lua.org/pil/17.html) for encoding. This means that you can safely re-call this method with the same value, but different settings, and you won't take a performance hit for large objects.

## Example


```ts
print(message.encode(5, "string"))
```
Output:

```logs
"5"
```
