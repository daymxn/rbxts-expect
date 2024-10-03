---
id: expect.filter
title: Filter type
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Filter](./expect.filter.md)

## Filter type

Callback for deciding if a `value` satisfies a condition.

**Signature:**

```typescript
type Filter<T = unknown> = (value: T) => boolean;
```

## Example


```ts
const isEven: Filter<number> = (value) => value % 2 === 0;
```
