---
id: expect.assertion.typeof_2
title: Assertion.typeOf() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [typeOf](./expect.assertion.typeof_2.md)

## Assertion.typeOf() method

Asserts that the value is of type `I`<!-- -->, according to a provided [t check](https://github.com/osyrisrblx/t)<!-- -->.

**Signature:**

```typescript
typeOf<I>(tChecker: t.check<I>): Assertion<I>;
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

[Assertion](./expect.assertion.md)<!-- -->&lt;I&gt;

## Remarks

_Type alias for the `instanceOf` version of this._

## Example


```ts
expect(1).to.be.an.instanceOf(t.number);
```
