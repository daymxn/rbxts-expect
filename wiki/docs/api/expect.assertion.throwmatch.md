---
id: expect.assertion.throwmatch
title: Assertion.throwMatch() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [throwMatch](./expect.assertion.throwmatch.md)

## Assertion.throwMatch() method

Asserts that the function throws an exception that matches the lua pattern `pattern`<!-- -->.

**Signature:**

```typescript
throwMatch(pattern: string): Assertion<T>;
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


</td></tr>
</tbody></table>
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;T&gt;

## Remarks

For string literals or substring matching, use  instead.

## Example


```ts
expect(buyPet).to.throwMatch("^Error:.+Money");
```
