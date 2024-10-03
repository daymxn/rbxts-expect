---
id: expect.assertion.instanceof_2
title: Assertion.instanceOf() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [instanceOf](./expect.assertion.instanceof_2.md)

## Assertion.instanceOf() method

Asserts that the value is an instance of `I`<!-- -->, according to a provided [t check](https://github.com/osyrisrblx/t)<!-- -->.

**Signature:**

```typescript
instanceOf<I>(tChecker: t.check<I>): Assertion<I>;
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

## Example


```ts
expect(1).to.be.an.instanceOf(t.number);
```
