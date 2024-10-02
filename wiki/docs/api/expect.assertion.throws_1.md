---
id: expect.assertion.throws_1
title: Assertion.throws() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [throws](./expect.assertion.throws_1.md)

## Assertion.throws() method

Asserts that the function throws an exception that contains the string `substring`<!-- -->.

**Signature:**

```typescript
throws(substring: string): Assertion<T>;
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

substring


</td><td>

string


</td><td>


</td></tr>
</tbody></table>
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;T&gt;

## Remarks

For pattern matching, use [throwsMatch](./expect.assertion.throwsmatch.md) instead.

_Type alias for the `throw` version of this._

## Example


```ts
expect(buyPet).to.be.a.function().that.throws("Not enough money");
```
