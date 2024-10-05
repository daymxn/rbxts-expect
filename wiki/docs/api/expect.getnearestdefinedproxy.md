---
id: expect.getnearestdefinedproxy
title: getNearestDefinedProxy() function
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [getNearestDefinedProxy](./expect.getnearestdefinedproxy.md)

## getNearestDefinedProxy() function

Finds the nearest proxy in the hierarchy that has a non null value, if any.

**Signature:**

```typescript
declare function getNearestDefinedProxy<T = unknown, R = unknown>(proxy: Proxy<T>): Proxy<R> | undefined;
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

proxy


</td><td>

[Proxy](./expect.proxy.md)<!-- -->&lt;T&gt;


</td><td>

The child to start the search from.


</td></tr>
</tbody></table>
**Returns:**

[Proxy](./expect.proxy.md)<!-- -->&lt;R&gt; \| undefined

The closest [proxy](./expect.proxyinstance.md) that has a valid (non null) [value](./expect.proxyinstance._proxy_value.md)<!-- -->, or undefined if all proxies have null values.

## Example


```ts
const person = {
  name: "Daymon",
  child: {
    name: "Michael"
  }
}

withProxy(person, (proxy) => {
  // assume this is valid typescript
  const greatGrandChild = proxy.child.child.child;
  expect(getNearestDefinedProxy(greatGrandChild)).to.deepEqual(person.child);
});
```
