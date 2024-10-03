---
id: expect.proxyinstance._proxy_path
title: ProxyInstance._proxy_path property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ProxyInstance](./expect.proxyinstance.md) &gt; [_proxy_path](./expect.proxyinstance._proxy_path.md)

## ProxyInstance._proxy_path property

The index from where this proxy was created on the [parent](./expect.proxyinstance._proxy_parent.md)<!-- -->.

**Signature:**

```typescript
_proxy_path?: string;
```

## Remarks

You should use [getProxyPath()](./expect.getproxypath.md) when you want to access this value.

All proxies recursively create proxies of their properties whenever accessed.

But each proxy has its own index that was used

This allows the [proxy path](./expect.proxyinstance._proxy_path.md) to be computed in full, even if you only have the final proxy.

_Note that if this is the root proxy, then it won't have a parent_.

## Example


```ts
const proxy = createProxy({name: "Daymon"});
const child = proxy.name;

print(getProxyPath(child));
print(getProxyPath(proxy));
```
Output:

```logs
name
nil
```
