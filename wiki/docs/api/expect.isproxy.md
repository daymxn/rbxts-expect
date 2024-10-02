---
id: expect.isproxy
title: isProxy() function
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [isProxy](./expect.isproxy.md)

## isProxy() function

Type guard for [Proxy](./expect.proxy.md) values.

**Signature:**

```typescript
declare function isProxy<T>(value: T): value is Proxy<T>;
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

value


</td><td>

T


</td><td>

The value to check is a proxy


</td></tr>
</tbody></table>
**Returns:**

value is [Proxy](./expect.proxy.md)<!-- -->&lt;T&gt;

## Example


```ts
function LogValue(value: unknown) {
 if(isProxy(value)) {
   print(getProxyValue(value));
 } else {
   print(value);
 }
}

LogValue(5);
LogValue(createProxy({name: "Daymon"}));
```
Output:

```logs
5
{ name: "Daymon" }
```
