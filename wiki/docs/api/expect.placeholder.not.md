---
id: expect.placeholder.not
title: Placeholder.not property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Placeholder](./expect.placeholder.md) &gt; [not](./expect.placeholder.not.md)

## Placeholder.not property

A placeholder for the word `"NOT"`<!-- -->, that will only be populated when the assertion is [negated](./expect.assertion.not.md)<!-- -->.

**Signature:**

```typescript
not: string;
```

## Remarks

Can be of use when you're writing an [expect message](./expect.expectmessagebuilder.md)<!-- -->, and the only difference between your normal message and your negated message is the word "NOT".

## Example

Let's say we were checking if an array was empty:

```ts
new ExpectMessageBuilder(
 `Expected ${place.name} to be empty`,
 `Expected ${place.name} to NOT be empty`
);
```
Notice how the only difference between the normal message and the negated one is the word "NOT"? We can use the `not` placeholder to reduce this:

```ts
new ExpectMessageBuilder(
 `Expected ${place.name} to ${place.not} be empty`
);
```
And as such, the word "NOT" will be added, but only if the check is negated.

```logs
Expected [1,2,3] to be empty
Expected [] to NOT be empty
```
