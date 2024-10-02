---
id: expect.expectmessagebuilder.build
title: ExpectMessageBuilder.build() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [build](./expect.expectmessagebuilder.build.md)

## ExpectMessageBuilder.build() method

Creates an error message to display, based on the data attached to this instance.

**Signature:**

```typescript
build(pass?: boolean, negated?: boolean): string;
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

pass


</td><td>

boolean


</td><td>

_(Optional)_ Did the check [pass](./expect.expectmessagebuilder.pass.md)<!-- -->?


</td></tr>
<tr><td>

negated


</td><td>

boolean


</td><td>

_(Optional)_ Was the check [negated](./expect.assertion.not.md)<!-- -->?


</td></tr>
</tbody></table>
**Returns:**

string

A string that can be output, rendered in the defined format and with all data attached.

## Remarks

This is the final method called, and is usually done by [expect()](./expect.expect.md) itself.

This creates a string with all the relevant data attached and ready to be thrown as an error.
