---
id: expect.proxyinstance._proxy_value
title: ProxyInstance._proxy_value property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ProxyInstance](./expect.proxyinstance.md) &gt; [_proxy_value](./expect.proxyinstance._proxy_value.md)

## ProxyInstance._proxy_value property

The inner value that this proxy is wrapping around.

**Signature:**

```typescript
_proxy_value: T;
```

## Remarks

You should use [getProxyValue()](./expect.getproxyvalue.md) when you want to access this value.

Note that [Assertion.value](./expect.assertion.value.md) is already mapped to this whenever dealing with proxies.

## Example


```ts
const proxy = createProxy({name: "Daymon"});
print(getProxyValue(proxy));
```
Output:

```logs
{ name: "Daymon" }
```
