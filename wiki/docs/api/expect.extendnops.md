---
id: expect.extendnops
title: extendNOPs() function
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [extendNOPs](./expect.extendnops.md)

## extendNOPs() function

Add additional NOOPs to [expect()](./expect.expect.md)<!-- -->.

**Signature:**

```typescript
declare function extendNOPs(methods: ReadonlyArray<string>): void;
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

An array of property names to use as NOOPs


</td></tr>
</tbody></table>
**Returns:**

void

## Remarks

A NOOP is a property that does nothing. It's just there to make the test easier to read.

For example:

```ts
expect("Daymon").to.have.the.substring("Day");
```
In this case, `to`<!-- -->, `have`<!-- -->, and `the` are all NOOPs.

## Example


```ts
// augment the expect module so typescript knows the properties exists
declare module "@rbxts/expect" {
  interface Assertion<T> {
    readonly to: this;
    readonly have: this;
    readonly the: this;
  }
}

// add the properties to expect for runtime usage
extendNOPs(["to", "have", "the"]);
```
