---
id: expect.withproxy
title: withProxy() function
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [withProxy](./expect.withproxy.md)

## withProxy() function

Creates a [Proxy](./expect.proxy.md) around a `value`<!-- -->, and calls the `callback` with it.

**Signature:**

```typescript
declare function withProxy<T, R = unknown>(value: T, callback: (proxy: Proxy<T>) => R): R;
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

The value to wrap a [Proxy](./expect.proxy.md) around.


</td></tr>
<tr><td>

callback


</td><td>

(proxy: [Proxy](./expect.proxy.md)<!-- -->&lt;T&gt;) =&gt; R


</td><td>

A function to invoke with the created proxy.


</td></tr>
</tbody></table>
**Returns:**

R

Whatever the `callback` returns is propagated back out.

## Example


```ts
withProxy(person, (proxy) => {
  expect(proxy.parent.cars).to.be.empty();
});
```
Error message:

```logs
Expected parent.cars to be empty, but it had 2 elements.
```
