---
id: expect.assertion.string
title: Assertion.string() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [string](./expect.assertion.string.md)

## Assertion.string() method

Asserts that the value is a [string](https://create.roblox.com/docs/luau/strings)<!-- -->.

**Signature:**

```typescript
string(): Assertion<string>;
```
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;string&gt;

## Remarks

Just a wrapper around , but with the `string` type provided automatically.

## Example


```ts
expect("daymon").to.be.a.string();
```
