---
id: expect.expectmessagebuilder.failuremetadata
title: ExpectMessageBuilder.failureMetadata() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [failureMetadata](./expect.expectmessagebuilder.failuremetadata.md)

## ExpectMessageBuilder.failureMetadata() method

Attach data to follow after the main message, in the format of `key: value`<!-- -->.

Only attached when the message is a [failure](./expect.expectmessagebuilder.fail.md)<!-- -->.

**Signature:**

```typescript
failureMetadata(data: Record<string, unknown>): this;
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

The same as [metadata](./expect.expectmessagebuilder.metadata.md)<!-- -->, but is limited to only failures.

A failure is effectively the same thing as `!negated`<!-- -->.

Useful for when you wanna conditionally attach data, but only when the case is not a negation.

Will come _after_ the [metadata](./expect.expectmessagebuilder.metadata.md) (if any).

_Note that this merges with any existing failure metadata, so you can safely call this multiple times to add more data or overwrite previous data_

## Example

Lets say we're checking that all the values in an array are equal to an `expected` value.

```ts
for(const [index, value] of ipairs(actual)) {
  message.failureMetadata({ Index: index, Value: value });
  if(value !== expected) return message.fail();
}
```
Our output will look like so:

```logs
Expected '[1,1,2]' to all be equal to '1', but there was a value that was not.
Index: 3
Value: 2
```
Which might look the same as using a normal `metadata`<!-- -->, but the difference comes into play when the result is a pass.

If we used normal `metadata`<!-- -->, and our check was passed- but it was negated, our output would look like so:

```logs
Expected '[1,1,1]' to NOT all be equal to '1'.
Index: 3
Value: 1
```
But if we use `failureMetadata` instead, it won't be attached in the case of a pass:

```logs
Expected '[1,1,1]' to NOT all be equal to '1'.
```
