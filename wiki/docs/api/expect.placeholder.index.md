---
id: expect.placeholder.index
title: Placeholder.index property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Placeholder](./expect.placeholder.md) &gt; [index](./expect.placeholder.index.md)

## Placeholder.index property

A placeholder for array [indices](./expect.placeholder.index.md)<!-- -->.

**Signature:**

```typescript
index: string;
```

## Remarks

Usually, indices are attached as [metadata](./expect.expectmessagebuilder.metadata.md)<!-- -->, but sometimes you might also want to show the index in your message.

That's where the `index` placeholder comes into play.

## Example

For example, lets say we were testing if two arrays are equal.

```ts
new ExpectMessageBuilder(
  `Expected the array ${place.actual.value} to ${place.not} equal ${place.expected.value}`
).failureSuffix(`, but the ${place.index}nth element ${place.reason}`);
```
Which would result in the following output:

```logs
Expected the array [1,2,3] to equal [1,2,4], but the 3nth element had a different value
```
