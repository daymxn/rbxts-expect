---
id: expect.placeholder.reason
title: Placeholder.reason property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Placeholder](./expect.placeholder.md) &gt; [reason](./expect.placeholder.reason.md)

## Placeholder.reason property

A utility placeholder for describing why the check failed.

**Signature:**

```typescript
reason: string;
```

## Remarks

A lot of times, your check might me making multiple assertions, or have different errors depending on the context.

Using a `reason`<!-- -->, you can specify a place in your message for this data to be provided.

You can then "provide" a reason via [ExpectMessageBuilder.reason()](./expect.expectmessagebuilder.reason.md)<!-- -->.

_Note that if you "provide" a reason, but your string doesn't have a `reason` placeholder in it- the reason will be attached right before the metadata as `Reason: message`<!-- -->_

## Example 1

Lets say we were checking if a value was an array.

```ts
new ExpectMessageBuilder(
  `Expected ${place.name} to be an array`
).failureSuffix(`, but ${place.reason}`);
```
By using a `reason`<!-- -->, we can provide a bunch of different reasonings for why the value isn't an array:

```logs
Expected '5' to be an array, but it was a number
Expected '{...}' to be an array, but it had a non number key
Expected 'nil' to be an array, but it was undefined
```

## Example 2

If you populate a reason at runtime, but don't have a `reason` in your message, it will still propgate to the message.

```ts
new ExpectMessageBuilder(
  `Expected ${place.name} to be an array`
);
```
Example error:

```ts
Expected '5' to be an array
Reason: it was a number
```
This way, you can add a `reason` whenever you need it, without needing to find a predefined spot for it in your message.
