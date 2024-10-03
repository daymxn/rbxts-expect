---
id: expect.expectmessagebuilderoptions.attachfulloncollapse
title: ExpectMessageBuilderOptions.attachFullOnCollapse property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectMessageBuilderOptions](./expect.expectmessagebuilderoptions.md) &gt; [attachFullOnCollapse](./expect.expectmessagebuilderoptions.attachfulloncollapse.md)

## ExpectMessageBuilderOptions.attachFullOnCollapse property

Whether to automatically attach [full](./expect.actualplaceholder.fullvalue.md) versions of variables whenever they're [collapsed](./expect.expectconfig.collapselength.md)<!-- -->.

**Signature:**

```typescript
attachFullOnCollapse: boolean;
```

## Remarks

If a [VariableData](./expect.variabledata.md) is collapsed in the building of a message, its non collapsed version will be appended after the metadata under either `Expected (full):` or `Actual (full):`<!-- -->.

Useful for ensuring your primary failure message is short (and easy to read quickly), while retaining further details for debugging.

## Example

With `attachFullOnCollapse: false`

```ts
Expected {...} to equal {...}
```
With `attachFullOnCollapse: true`

```ts
Expected {...} to equal {...}

Expected (full): '{ name: "Daymon", age: 5 }'
Actual (full): '{ name: "Daymon", age: 6 }'
```
