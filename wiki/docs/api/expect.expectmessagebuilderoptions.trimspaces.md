---
id: expect.expectmessagebuilderoptions.trimspaces
title: ExpectMessageBuilderOptions.trimSpaces property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilderOptions](./expect.expectmessagebuilderoptions.md) &gt; [trimSpaces](./expect.expectmessagebuilderoptions.trimspaces.md)

## ExpectMessageBuilderOptions.trimSpaces property

Trim the spaces around [placeholders](./expect.placeholder.md) when they're absent.

**Signature:**

```typescript
trimSpaces: boolean;
```

## Remarks

This is different from [trimWhiteSpace](./expect.expectmessagebuilderoptions.trimwhitespace.md)<!-- -->, in that this only pertains to the space around absent [placeholders](./expect.placeholder.md)<!-- -->.

## Example

Given the following message:

```ts
const baseMessage = new ExpectMessageBuilder(
  `Expected ${place.actual.value} to ${place.not} equal ${place.expected.value}`
);
```
If the statement was _not_ negated, that means that `${place.not}` would be absent.

With `trimSpaces: false`

```ts
Expected 5 to   equal 5
```
With `trimSpaces: true`

```ts
Expected 5 to equal 5
```
