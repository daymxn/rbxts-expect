---
id: expect.assertion.empty
title: Assertion.empty() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [empty](./expect.assertion.empty.md)

## Assertion.empty() method

Asserts that the value is empty.

**Signature:**

```typescript
empty(): Assertion<T>;
```
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;T&gt;

## Remarks

Works with strings or iterable types.

An object is empty when it has no keys.

A string is empty when it has no characters.

An iterable is empty when it has no elements.

## Example


```ts
expect([]).to.be.empty();
expect({}).to.be.empty();
expect("").to.be.empty();
```
