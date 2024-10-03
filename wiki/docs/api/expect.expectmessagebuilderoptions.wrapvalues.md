---
id: expect.expectmessagebuilderoptions.wrapvalues
title: ExpectMessageBuilderOptions.wrapValues property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilderOptions](./expect.expectmessagebuilderoptions.md) &gt; [wrapValues](./expect.expectmessagebuilderoptions.wrapvalues.md)

## ExpectMessageBuilderOptions.wrapValues property

Whether to wrap [VariableData](./expect.variabledata.md) in quotes when output.

**Signature:**

```typescript
wrapValues: boolean;
```

## Remarks

Strings are wrapped in double quotes (`"`<!-- -->) while everything else is wrapped in single quotes (`'`<!-- -->).

## Example

With `wrapValues: false`

```ts
Expected 5 to equal daymon
```
With `wrapValues: true`

```ts
Expected '5' to equal "daymon"
```
