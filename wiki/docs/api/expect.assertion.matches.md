---
id: expect.assertion.matches
title: Assertion.matches() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [matches](./expect.assertion.matches.md)

## Assertion.matches() method

Asserts that the actual value has the same properties and values as the `expected`<!-- -->.

**Signature:**

```typescript
matches<R extends object>(expected: R): Assertion<R & T>;
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

expected


</td><td>

R


</td><td>


</td></tr>
</tbody></table>
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;R &amp; T&gt;

## Remarks

_Type alias for [match](./expect.assertion.match.md)<!-- -->._

## Example


```ts
expect({
  name: "daymon",
  age: 24
  children: [{
    name: "michael",
    age: 4
  }]
}).to.be.an.object().that.matches({ age: 24 });
```
