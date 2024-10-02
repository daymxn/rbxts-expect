---
id: expect.assertion.typeof
title: Assertion.typeOf() method
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [typeOf](./expect.assertion.typeof.md)

## Assertion.typeOf() method

Asserts that the value is of type `typeName`<!-- -->.

**Signature:**

```typescript
typeOf<I extends keyof CheckableTypes>(name: I): Assertion<I>;
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

name


</td><td>

I


</td><td>


</td></tr>
</tbody></table>
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;I&gt;

## Remarks

The type is checked via [typeOf](https://github.com/roblox-ts/compiler-types/blob/a13fdb1171895c7ed1a7f091d18031534e988886/types/callMacros.d.ts#L11)<!-- -->.

_Type alias for the `instanceOf` version of this._

## Example


```ts
expect(1).to.be.an.instanceOf("number");
expect(new Vector3()).to.be.an.instanceOf("Vector3");
```
