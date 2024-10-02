---
id: expect.expect
title: expect() function
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [expect](./expect.expect.md)

## expect() function

Perform assertions/checks on the state of a value.

**Signature:**

```typescript
declare function expect<T>(value: T): Assertion<T>;
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

value


</td><td>

T


</td><td>

The "actual" value to perform checks against.


</td></tr>
</tbody></table>
**Returns:**

[Assertion](./expect.assertion.md)<!-- -->&lt;T&gt;

An instance of [Assertion](./expect.assertion.md) that you should chain for checks.

## Remarks

The `value` you provide is reffered to as the "actual" value.

You can then use the instance returned by `expect` to make various "assertions" about the state of the value. `expect` will throw a descriptive error message if any of the checks fail.

For a full list of available checks, take a look at the [API](https://rbxts-expect.daymxn.com/docs/api).

## Example


```ts
expect(5).to.equal(5);

expect("Daymon").to.have.the.substring("Day");

expect([1,2,3]).to.include(1).but.not.include(4);

expect(Sport.Basketball).to.be.the.enum(Sport).and.to.be.oneOf(["Basketball", "Soccer"]);
```
