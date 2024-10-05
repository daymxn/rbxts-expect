---
id: expect.assertion.pattern
title: Assertion.pattern() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [pattern](./expect.assertion.pattern.md)

## Assertion.pattern() method

Asserts that the `expectedValue` is a string that contains a match for the provided lua `pattern`<!-- -->.

**Signature:**

```typescript
pattern(pattern: string): this;
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

pattern


</td><td>

string


</td><td>

A [roblox string pattern](https://create.roblox.com/docs/luau/strings#string-pattern-reference) that the actual string should have a valid match for.


</td></tr>
</tbody></table>
**Returns:**

this

## Example


```ts
expect("Daymon").to.have.the.pattern("^%u");
```
