---
id: expect.assertion.array
title: Assertion.array() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [array](./expect.assertion.array.md)

## Assertion.array() method

Asserts that the value is an array.

**Signature:**

```typescript
array(): Assertion<T extends unknown[] ? T : T[]>;
```
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;T extends unknown\[\] ? T : T\[\]&gt;

## Remarks

An array is classified as a table of incrementing number keys that start at `1`<!-- -->, and without any holes.


## Example


```ts
expect([1,2,3]).to.be.an.array();
expect({ name: "daymon" }).to.not.be.an.array();
```
