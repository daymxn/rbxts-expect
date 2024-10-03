---
id: expect.expectmessagebuilderoptions
title: ExpectMessageBuilderOptions interface
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilderOptions](./expect.expectmessagebuilderoptions.md)

## ExpectMessageBuilderOptions interface

Configuration options for instances of [ExpectMessageBuilder](./expect.expectmessagebuilder.md)<!-- -->.

**Signature:**

```typescript
interface ExpectMessageBuilderOptions 
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

[attachFullOnCollapse](./expect.expectmessagebuilderoptions.attachfulloncollapse.md)


</td><td>


</td><td>

boolean


</td><td>

Whether to automatically attach [full](./expect.actualplaceholder.fullvalue.md) versions of variables whenever they're [collapsed](./expect.expectconfig.collapselength.md)<!-- -->.


</td></tr>
<tr><td>

[trimSpaces](./expect.expectmessagebuilderoptions.trimspaces.md)


</td><td>


</td><td>

boolean


</td><td>

Trim the spaces around [placeholders](./expect.placeholder.md) when they're absent.


</td></tr>
<tr><td>

[trimWhiteSpace](./expect.expectmessagebuilderoptions.trimwhitespace.md)


</td><td>


</td><td>

boolean


</td><td>

Trim the white space around the message after building it.


</td></tr>
<tr><td>

[wrapValues](./expect.expectmessagebuilderoptions.wrapvalues.md)


</td><td>


</td><td>

boolean


</td><td>

Whether to wrap [VariableData](./expect.variabledata.md) in quotes when output.


</td></tr>
</tbody></table>