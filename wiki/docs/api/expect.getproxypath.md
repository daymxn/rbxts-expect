---
id: expect.getproxypath
title: getProxyPath() function
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [getProxyPath](./expect.getproxypath.md)

## getProxyPath() function

Safely gets the [path](./expect.proxyinstance._proxy_path.md) of a proxy, without triggering any metamethods.

**Signature:**

```typescript
declare function getProxyPath<T = unknown>(proxy: Proxy<T>): string | undefined;
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

The proxy to get the path of.


</td></tr>
</tbody></table>
**Returns:**

string \| undefined

The path of this proxy, or undefined if it was absent.
