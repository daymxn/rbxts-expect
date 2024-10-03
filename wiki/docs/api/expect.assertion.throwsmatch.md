---
id: expect.assertion.throwsmatch
title: Assertion.throwsMatch() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [throwsMatch](./expect.assertion.throwsmatch.md)

## Assertion.throwsMatch() method

Asserts that the function throws an exception that matches the lua pattern `pattern`<!-- -->.

**Signature:**

```typescript
throwsMatch(pattern: string): Assertion<T>;
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

_Type alias for the `throwMatch` version of this._

## Example


```ts
expect(buyPet).to.be.a.function().that.throwsMatch("^Error:.+Money");
```
