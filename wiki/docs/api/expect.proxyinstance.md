---
id: expect.proxyinstance
title: ProxyInstance interface
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ProxyInstance](./expect.proxyinstance.md)

## ProxyInstance interface

The data attached to a [Proxy](./expect.proxy.md)<!-- -->.

**Signature:**

```typescript
interface ProxyInstance<T> 
```

## Remarks

You'll rarely (if ever) need to use this interface, and should instead use [Proxy](./expect.proxy.md) instead.

This is mainly provided as a way to clarify how a proxy looks internally.

## Properties

<table><thead><tr><th>

Property


</th><th>

Modifiers


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[_is_proxy](./expect.proxyinstance._is_proxy.md)


</td><td>


</td><td>

true


</td><td>

A value attached to all proxies to easily identify them as proxies.


</td></tr>
<tr><td>

[_proxy_parent?](./expect.proxyinstance._proxy_parent.md)


</td><td>


</td><td>

[Proxy](./expect.proxy.md)<!-- -->&lt;unknown&gt;


</td><td>

_(Optional)_ The proxy that created this proxy.


</td></tr>
<tr><td>

[_proxy_path?](./expect.proxyinstance._proxy_path.md)


</td><td>


</td><td>

string


</td><td>

_(Optional)_ The index from where this proxy was created on the [parent](./expect.proxyinstance._proxy_parent.md)<!-- -->.


</td></tr>
<tr><td>

[_proxy_value](./expect.proxyinstance._proxy_value.md)


</td><td>


</td><td>

T


</td><td>

The inner value that this proxy is wrapping around.


</td></tr>
</tbody></table>