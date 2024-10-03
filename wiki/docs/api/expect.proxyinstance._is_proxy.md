---
id: expect.proxyinstance._is_proxy
title: ProxyInstance._is_proxy property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ProxyInstance](./expect.proxyinstance.md) &gt; [_is_proxy](./expect.proxyinstance._is_proxy.md)

## ProxyInstance._is_proxy property

A value attached to all proxies to easily identify them as proxies.

**Signature:**

```typescript
_is_proxy: true;
```

## Remarks

If you're wanting to check if something is a proxy, you should typically use [isProxy()](./expect.isproxy.md) instead.

## Example


```ts
if(rawget(value, "_is_proxy") === true) {
 return getProxyValue(value);
}
```
