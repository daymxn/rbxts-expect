---
id: expect.placeholder.nil
title: Placeholder.nil property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Placeholder](./expect.placeholder.md) &gt; [nil](./expect.placeholder.nil.md)

## Placeholder.nil property

A placeholder for the word `"nil"`<!-- -->.

**Signature:**

```typescript
nil: string;
```

## Remarks

Can be of use when you want to fallback to the word `nil` with proper [wrapping](./expect.expectmessagebuilderoptions.wrapvalues.md) support, and your value is undefined.

This is used internally automatically for undefined variables on [actual](./expect.placeholder.actual.md) and [expected](./expect.placeholder.expected.md)<!-- -->, but it's here for you incase you're doing some complex logic- or need it for purposes beyond "actual" and "expected".

## Example

Let's say we were checking if an object was an arry:

```ts
new ExpectMessageBuilder(
 `Expected ${place.name} to be an array`
);
```
In our method, we could do something like this:

```ts
message.actualValue(actualValue ?? place.nil);
```
Then, our output would come out like so:

```logs
Expected 'nil' to be an array
```
