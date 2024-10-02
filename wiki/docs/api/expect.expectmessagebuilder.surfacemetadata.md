---
id: expect.expectmessagebuilder.surfacemetadata
title: ExpectMessageBuilder.surfaceMetadata() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [surfaceMetadata](./expect.expectmessagebuilder.surfacemetadata.md)

## ExpectMessageBuilder.surfaceMetadata() method

Attach data to follow after the main message, in the format of `key: value`<!-- -->.

Only attached when the message does NOT have a [path](./expect.placeholder.path.md)<!-- -->.

**Signature:**

```typescript
surfaceMetadata(data: Record<string, unknown>): this;
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

The same as [metadata](./expect.expectmessagebuilder.metadata.md)<!-- -->, but is limited to only messages without [paths](./expect.placeholder.path.md)<!-- -->.

Useful for when you wanna conditionally attach data, but only when the case is on non nested objects.

Will come _before_ all other metadata types (if any).

_Note that this merges with any existing surface metadata, so you can safely call this multiple times to add more data or overwrite previous data_

## Example

For example, let's say we were checking if an object was empty, and we wanted to use the name `the object` to keep the message short:

```ts
const baseMessage = new ExpectMessageBuilder(
 `Expected ${place.name} to ${place.not} be empty`
)
.name("the object")
.nestedMetadata({ [place.path]: place.actual.value });
```
We might have logic like so:

```ts
if (amount > 1) {
 return message
  .suffix(`, but it had ${amount} keys`)
  .surfaceMetadata({ Value: place.actual.value })
  .fail();
}
```
Example output for messages without a path:

```logs
Expected the object to be empty, but it had 2 keys

Value: '{"name":"Daymon","age":24}'
```
Example output for messages with a path:

```logs
Expected parent.parent to be empty, but it had 2 keys

parent.parent: '{"name":"Daymon","age":24}'
```
