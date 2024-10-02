---
id: expect.err
title: err() function
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [err](./expect.err.md)

## err() function

Helper function for testing [expect error messages](./expect.expectmessagebuilder.md)<!-- -->.

Throws an error if the `callback` doesn't throw.

**Signature:**

```typescript
declare function err(callback: () => unknown, ...messages: string[]): void;
```

## Parameters

<table><thead><tr><th>

Parameter


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

callback


</td><td>

() =&gt; unknown


</td><td>

The function to wrap around.


</td></tr>
<tr><td>

messages


</td><td>

string\[\]


</td><td>

A variable amount of substrings to look for in the message.


</td></tr>
</tbody></table>
**Returns:**

void

## Remarks

Intended to be used in test (`.spec.ts`<!-- -->) files.

Used internally for testing  and other error messages, so that internal issues don't cause tests to accidentally pass.

## Example 1

Testing for errors:

```ts
err(() => {
  expect([1]).to.be.empty();
});
```
Output:

```logs
The function did not throw a message.
```

## Example 2

Testing for certain errors:

```ts
err(() => {
  expect([1]).to.be.empty();
}, `Expected '[1]' to be empty, but it had an element`);
```
Output if the string(s) weren't found in the error:

```logs
The function threw with the wrong message.

  Expected Message:
  Expected '[1]' to be empty, but it had an element

  Actual Message:
  Expected '[1]' to be empty, but it had the element '1'
```
Output if the function didn't throw at all:

```logs
The function did not throw a message.

  Expected Messages:
  Expected '[1]' to be empty, but it had an element
```

## Example 3

Testing for multiple substrings:

```ts
err(() => {
  expect([1]).to.be.empty();
}, "to be empty", "but it had an element");
```
If it doesn't find any of the provided substrings, it will throw with that specific substring:

```logs
The function threw with the wrong message.

  Expected Message:
  "but it had an element"

  Actual Message:
  Expected '[1]' to be empty, but it had the element '1'
```
