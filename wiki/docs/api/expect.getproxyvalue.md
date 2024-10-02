---
id: expect.getproxyvalue
title: getProxyValue() function
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [getProxyValue](./expect.getproxyvalue.md)

## getProxyValue() function

Safely gets the [value](./expect.proxyinstance._proxy_value.md) of a proxy, without trigger any metamethods.

**Signature:**

```typescript
declare function getProxyValue<T = unknown>(proxy: Proxy<T>): T;
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

The proxy to get the value of.


</td></tr>
</tbody></table>
**Returns:**

T

The inner value of this proxy, type casted to `T`<!-- -->.
