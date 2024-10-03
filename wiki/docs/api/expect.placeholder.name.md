---
id: expect.placeholder.name
title: Placeholder.name property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Placeholder](./expect.placeholder.md) &gt; [name](./expect.placeholder.name.md)

## Placeholder.name property

A utility placeholder for either the [path](./expect.placeholder.path.md)<!-- -->, or the [actual value](./expect.placeholder.actual.md)<!-- -->.

Messages can configure their own names as well.

**Signature:**

```typescript
name: string;
```

## Remarks

A common theme in messages in to display the path when working with tables, and display the actual value when working with non tables.

Using a `name`<!-- -->, you can specify to use the [path](./expect.placeholder.path.md) whenever it's available, but fallback to the [actual.value](./expect.actualplaceholder.value.md)<!-- -->.

You can also provide your own name to fallback for instead of the actual value. You can do this via [ExpectMessageBuilder.name()](./expect.expectmessagebuilder.name.md)<!-- -->.

## Example

Let's say we were checking if a value was an array:

```ts
new ExpectMessageBuilder(
  `Expected ${place.name} to be an array`
);
```
When working with tables, we'd get the following output:

```logs
Expected parent.cars to be an array
```
But when working with non tables, we'd get:

```logs
Expected '5' to be an array
```
It's also a common practice to use `nestedMetadata` to provide the "actual" value whenever the path replaces it.

```ts
new ExpectMessageBuilder(
  `Expected ${place.name} to be an array`
).nestedMetadata({ [place.path]: place.actual.fullValue });
```
When working with tables, we'd get the following output:

```logs
Expected parent.cars to be an array
parent.cars: '5'
```
But when working with non tables, that additional data wouldn't be there:

```logs
Expected '5' to be an array
```
