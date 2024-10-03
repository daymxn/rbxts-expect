---
id: expect.assertion.arrayof_2
title: Assertion.arrayOf() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [arrayOf](./expect.assertion.arrayof_2.md)

## Assertion.arrayOf() method

Asserts that the value is an array of type `I`<!-- -->, according to a provided [t check](https://github.com/osyrisrblx/t)<!-- -->.

**Signature:**

```typescript
arrayOf<I>(tChecker: t.check<I>): Assertion<I[]>;
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

tChecker


</td><td>

t.check&lt;I&gt;


</td><td>


</td></tr>
</tbody></table>
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;I\[\]&gt;

## Remarks

_Type alias for the `array` version of this._

## Example


```ts
expect([1,2,3]).to.be.an.arrayOf(t.number);
```
