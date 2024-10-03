---
id: expect.placeholder.path
title: Placeholder.path property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Placeholder](./expect.placeholder.md) &gt; [path](./expect.placeholder.path.md)

## Placeholder.path property

A utility placeholder the path on nested variables.

**Signature:**

```typescript
path: string;
```

## Remarks

When working with tables, you might want to retain the path to the property that failed.

Using a `path`<!-- -->, you can specify a place in your message for this data to be provided.

You can then "provide" a path via [ExpectMessageBuilder.path()](./expect.expectmessagebuilder.path.md)<!-- -->.

Alternatively, you can use a [Proxy](./expect.proxy.md) to have this automatically provided.

## Example

Let's say we were checking if a value was an array:

```ts
new ExpectMessageBuilder(
  `${place.path} - Expected ${place.actual.value} to be an array`
);
```
We could then output messages like so:

```logs
parent.cars - Expected '2' to be an array
```
