---
id: expect.computefullproxypath
title: computeFullProxyPath() function
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [computeFullProxyPath](./expect.computefullproxypath.md)

## computeFullProxyPath() function

Recursively resolves the [path](./expect.proxyinstance._proxy_path.md) and [parent](./expect.proxyinstance._proxy_parent.md) of a [Proxy](./expect.proxy.md) to create a full path from the root.

**Signature:**

```typescript
declare function computeFullProxyPath<T>(proxy: Proxy<T>): string | undefined;
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


</td></tr>
</tbody></table>
**Returns:**

string \| undefined

## Remarks

Can be used to get the full path of leaf nodes.

## Example


```ts
print(computeFullProxyPath(myProxy.parent.parent.cars));
```
Output:

```logs
parent.parent.cars
```
