---
id: expect.getproxyparent
title: getProxyParent() function
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [getProxyParent](./expect.getproxyparent.md)

## getProxyParent() function

Safely gets the [parent](./expect.proxyinstance._proxy_parent.md) of a proxy, without trigger any metamethods.

**Signature:**

```typescript
declare function getProxyParent<T = unknown, R = unknown>(proxy: Proxy<T>): Proxy<R> | undefined;
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

The proxy to get the parent of.


</td></tr>
</tbody></table>
**Returns:**

[Proxy](./expect.proxy.md)<!-- -->&lt;R&gt; \| undefined

The parent of this proxy, or undefined if it doesn't have one.
