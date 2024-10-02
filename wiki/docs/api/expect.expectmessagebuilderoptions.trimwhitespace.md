---
id: expect.expectmessagebuilderoptions.trimwhitespace
title: ExpectMessageBuilderOptions.trimWhiteSpace property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilderOptions](./expect.expectmessagebuilderoptions.md) &gt; [trimWhiteSpace](./expect.expectmessagebuilderoptions.trimwhitespace.md)

## ExpectMessageBuilderOptions.trimWhiteSpace property

Trim the white space around the message after building it.

**Signature:**

```typescript
trimWhiteSpace: boolean;
```

## Remarks

This is different from [trimSpaces](./expect.expectmessagebuilderoptions.trimspaces.md)<!-- -->, in that this only pertains to the space around the entire message.

Will trim space at the start or end of a message, and does so only after the message has been completely built and populated.

## Example

Lets say you appended the path to the start of your messages:

```ts
const baseMessage = new ExpectMessageBuilder(
  `${place.path} Expected ${place.actual.value} to ${place.not} equal ${place.expected.value}`
);
```
If the statement ended up not having a path, your message would come out with a leading space.

With `trimWhiteSpace: false`

```ts
 Expected 5 to equal 4
```
With `trimWhiteSpace: true`

```ts
Expected 5 to equal 5
```
