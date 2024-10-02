---
id: expect.expectmessagebuilder.index
title: ExpectMessageBuilder.index() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilder](./expect.expectmessagebuilder.md) &gt; [index](./expect.expectmessagebuilder.index.md)

## ExpectMessageBuilder.index() method

Sets a value for the [index](./expect.placeholder.index.md) placeholder.

**Signature:**

```typescript
index(index?: number | string): this;
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

index


</td><td>

number \| string


</td><td>

_(Optional)_


</td></tr>
</tbody></table>
**Returns:**

this

This instance, for chaining.

## Remarks

Usually, indexies are attached as [metadata](./expect.expectmessagebuilder.metadata.md)<!-- -->, but sometimes you might also want to show the index in your message.

That's where the [index](./expect.placeholder.index.md) placeholder comes into play.

## Example

For example, lets say we were testing if two arrays are equal.

```ts
new ExpectMessageBuilder(
  `Expected the array ${place.actual.value} to ${place.not} equal ${place.expected.value}`
).failureSuffix(`, but the ${place.index}nth element ${place.reason}`);
```
We might use logic like so:

```ts
for(const [index, value] of ipairs(actual)) {
  if(expected[index] !== actual[index]) {
    return message.failWithReason("had a different value");
  }
}
```
Which would result in the following output:

```logs
Expected the array [1,2,3] to equal [1,2,4], but the 3nth element had a different value
```
