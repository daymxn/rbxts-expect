---
id: expect.extendnegations
title: extendNegations() function
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [extendNegations](./expect.extendnegations.md)

## extendNegations() function

Add additional negations to [expect()](./expect.expect.md)<!-- -->.

**Signature:**

```typescript
declare function extendNegations(methods: ReadonlyArray<string>): void;
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

methods


</td><td>

ReadonlyArray&lt;string&gt;


</td><td>

An array of property names to use as negations


</td></tr>
</tbody></table>
**Returns:**

void

## Remarks

A negation is a property that flips an assertion.

For example:

```ts
expect(5).to.not.equal(4);
```
In this case, `not` is the negation.

Instead of checking if `5 === 5`<!-- -->, we are now checking if `5 !== 5`<!-- -->.

Note that negations flip one another, so this passes:

```ts
expect(5).to.never.not.equal(4);
```

## Example


```ts
// augment the expect module so typescript knows the properties exists
declare module "@rbxts/expect" {
  interface Assertion<T> {
    readonly not: this;
    readonly never: this;
  }
}

// add the properties to expect for runtime usage
extendNegations(["not", "never"]);
```
