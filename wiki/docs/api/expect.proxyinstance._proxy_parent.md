---
id: expect.proxyinstance._proxy_parent
title: ProxyInstance._proxy_parent property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ProxyInstance](./expect.proxyinstance.md) &gt; [_proxy_parent](./expect.proxyinstance._proxy_parent.md)

## ProxyInstance._proxy_parent property

The proxy that created this proxy.

**Signature:**

```typescript
_proxy_parent?: Proxy<unknown>;
```

## Remarks

You should use [getProxyParent()](./expect.getproxyparent.md) when you want to access this value.

All proxies recursively create proxies of their properties whenever accessed.

This allows the [proxy path](./expect.proxyinstance._proxy_path.md) to be computed in full, even if you only have the final proxy.

_Note that if this is the root proxy, then it won't have a parent_.

## Example


```ts
const proxy = createProxy({name: "Daymon"});
const child = proxy.name;

assert(getProxyParent(child) === proxy);
```
