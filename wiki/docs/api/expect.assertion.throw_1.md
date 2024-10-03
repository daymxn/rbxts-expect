---
id: expect.assertion.throw_1
title: Assertion.throw() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [throw](./expect.assertion.throw_1.md)

## Assertion.throw() method

Asserts that the function throws an exception that contains the string `substring`<!-- -->.

**Signature:**

```typescript
throw(substring: string): Assertion<T>;
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

For pattern matching, use [throwMatch](./expect.assertion.throwmatch.md) instead.

## Example


```ts
expect(buyPet).to.throw("Failed to buy pet");
```
