---
id: expect.expectmessagebuilder._constructor_
title: ExpectMessageBuilder.(constructor)
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [(constructor)](./expect.expectmessagebuilder._constructor_.md)

## ExpectMessageBuilder.(constructor)

Create a new instance of [ExpectMessageBuilder](./expect.expectmessagebuilder.md)<!-- -->.

**Signature:**

```typescript
constructor(prefix?: string, negationPrefix?: string, options?: Partial<ExpectMessageBuilderOptions>);
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

prefix


</td><td>

string


</td><td>

_(Optional)_ Contents of the message, generally the static portion (defaults to [Placeholder.reason](./expect.placeholder.reason.md)<!-- -->).


</td></tr>
<tr><td>

negationPrefix


</td><td>

string


</td><td>

_(Optional)_ A prefix to use when the message is [negated](./expect.assertion.not.md) (replaces the standard prefix). If you don't provide a negation prefix, the `prefix` will be used instead (in the case of negations).


</td></tr>
<tr><td>

options


</td><td>

Partial&lt;[ExpectMessageBuilderOptions](./expect.expectmessagebuilderoptions.md)<!-- -->&gt;


</td><td>

_(Optional)_ Configuration settings for message output.


</td></tr>
</tbody></table>

## Remarks

Intended to be used in custom [methods](./expect.custommethodimpl.md) for [expect()](./expect.expect.md)<!-- -->.

If you don't provide a `prefix`<!-- -->, you can instead use a [reason](./expect.placeholder.reason.md) to create your message at runtime.
