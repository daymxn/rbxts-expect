---
id: expect.expectmessagebuilder.nestedmetadata
title: ExpectMessageBuilder.nestedMetadata() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [nestedMetadata](./expect.expectmessagebuilder.nestedmetadata.md)

## ExpectMessageBuilder.nestedMetadata() method

Attach data to follow after the main message, in the format of `key: value`<!-- -->.

Only attached when the message has a [path](./expect.placeholder.path.md)<!-- -->.

**Signature:**

```typescript
nestedMetadata(data: Record<string, unknown>): this;
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

The same as [metadata](./expect.expectmessagebuilder.metadata.md)<!-- -->, but is limited to only messages with [paths](./expect.placeholder.path.md)<!-- -->.

Useful for when you wanna conditionally attach data, but only when the case is on nested objects.

Will come _before_ all other metadata types (if any).

_Note that this merges with any existing nested metadata, so you can safely call this multiple times to add more data or overwrite previous data_

## Example

A very common use-case is attaching data about the actual value for nested objects, so you still get the path to the variable in the initial message.

```ts
const baseMessage = new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} equal ${place.expected.value} (${place.expected.type})`
)
.name(`${place.actual.value} (${place.actual.type})`)
.nestedMetadata({
  [place.path]: `${place.actual.value} (${place.actual.type})`,
});
```
Example output for messages without a path:

```logs
Expected '5' (number) to equal "5" (string)
```
Example output for messages with a path:

```logs
Expected parent.age to equal "5" (string)

  parent.age: '5' (number)
```
