---
id: expect.assertion.anyof
title: Assertion.anyOf() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [anyOf](./expect.assertion.anyof.md)

## Assertion.anyOf() method

Asserts that the value is _shallow_ equal to any of the provided `values`<!-- -->.

**Signature:**

```typescript
anyOf<R = T>(values: R[]): Assertion<R>;
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

values


</td><td>

R\[\]


</td><td>

An array of values to check for


</td></tr>
</tbody></table>
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;R&gt;

## Remarks

When used after an `enum` call, the output message will use the enum key as the value.

## Example 1

Basic Usage:

```ts
expect(1).to.be.anyOf([1,2,3]);
expect(0).to.not.be.anyOf([1,2,3]);
```

## Example 2

Enum Usage:

```ts
enum Sport {
  Basketball,
  Football,
  Soccer
}

expect(Sport.Basketball).to.be.the.enum(Sport).and.to.be.anyOf([Football, Soccer]);
// Expected 'Basketball' (enum/number) to be any of ["Football", "Soccer"]
```
