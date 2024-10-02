---
id: expect.expectmessagebuilder.metadata
title: ExpectMessageBuilder.metadata() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [metadata](./expect.expectmessagebuilder.metadata.md)

## ExpectMessageBuilder.metadata() method

Attach data to follow after the main message, in the format of `key: value`<!-- -->.

**Signature:**

```typescript
metadata(data: Record<string, unknown>): this;
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

data


</td><td>

Record&lt;string, unknown&gt;


</td><td>

An object of `key:value` pairs to attach after the message.


</td></tr>
</tbody></table>
**Returns:**

this

This instance, for chaining.

## Remarks

Each entry is seperated by a newline.

Useful for data that is only known at runtime, or data that is only needed for additional debugging- and should be seperate from the main contents of the message.

Metadata is sorted alphabetically in the output, but priority is placed for the following keys (in order): 'index', 'key', 'value', 'expected', 'actual'.

So if any of those keys are in your metadata, they'll come before the rest of your metadata. The capitalization doesn't matter either, so long as the keys are _exactly_ equal.

_Note that this merges with any existing metadata, so you can safely call this multiple times to add more data or overwrite previous data_

## Example

Lets say we're checking that all the values in an array are equal to an `expected` value.

```ts
for(const [index, value] of ipairs(actual)) {
  message.metadata({ Index: index, Value: value });
  if(value !== expected) return message.fail();
}
```
Our output will look like so:

```logs
Expected '[1,1,2]' to all be equal to '1', but there was a value that was not.
Index: 3
Value: 2
```
