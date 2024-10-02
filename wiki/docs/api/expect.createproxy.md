---
id: expect.createproxy
title: createProxy() function
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [createProxy](./expect.createproxy.md)

## createProxy() function

Creates a [Proxy](./expect.proxy.md) around a `value`<!-- -->.

**Signature:**

```typescript
declare function createProxy<T>(value: T, parent?: Proxy<unknown>, path?: string): Proxy<T>;
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

The inner [value](./expect.proxyinstance._proxy_value.md) of the proxy


</td></tr>
<tr><td>

parent


</td><td>

[Proxy](./expect.proxy.md)<!-- -->&lt;unknown&gt;


</td><td>

_(Optional)_ The proxy that created this proxy ([parent](./expect.proxyinstance._proxy_parent.md)<!-- -->), or undefined if it doesn't have a parent.


</td></tr>
<tr><td>

path


</td><td>

string


</td><td>

_(Optional)_ The index on the `parent` from which this proxy was created ([path](./expect.proxyinstance._proxy_path.md)<!-- -->), or undefined if it doesn't have a parent.


</td></tr>
</tbody></table>
**Returns:**

[Proxy](./expect.proxy.md)<!-- -->&lt;T&gt;

The newly created [Proxy](./expect.proxy.md)

## Remarks

You can also use the [withProxy()](./expect.withproxy.md) method to invoke a callback with the result; depending on your style.

## Example


```ts
expect(createProxy(myObject).parent.cars).to.be.empty();
```
Error message:

```logs
Expected parent.cars to be empty, but it had 2 elements.
```
