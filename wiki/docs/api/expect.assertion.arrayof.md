---
id: expect.assertion.arrayof
title: Assertion.arrayOf() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [arrayOf](./expect.assertion.arrayof.md)

## Assertion.arrayOf() method

Asserts that the value is an array of type `typeName`<!-- -->.

**Signature:**

```typescript
arrayOf<I extends keyof CheckableTypes>(typeName: I): Assertion<I[]>;
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

typeName


</td><td>

I


</td><td>


</td></tr>
</tbody></table>
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;I\[\]&gt;

## Remarks

Each element in the array has its type checked via [typeOf](https://github.com/roblox-ts/compiler-types/blob/a13fdb1171895c7ed1a7f091d18031534e988886/types/callMacros.d.ts#L11)<!-- -->.

_Type alias for the `array` version of this_

## Example


```ts
expect([1,2,3]).to.be.an.arrayOf("number");
expect([new Vector3()]).to.be.an.arrayOf("Vector3");
```
