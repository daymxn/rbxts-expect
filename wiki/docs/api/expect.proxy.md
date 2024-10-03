---
id: expect.proxy
title: Proxy type
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Proxy](./expect.proxy.md)

## Proxy type

A wrapper around a value `T` that provides meta context on index access.

**Signature:**

```typescript
type Proxy<T> = T & ProxyInstance<T>;
```
**References:** [ProxyInstance](./expect.proxyinstance.md)

## Remarks

Proxies attach a listener to the `__index` metatable, which allows us to log the path of values accessed.

This allows [expect()](./expect.expect.md) to populate the [path](./expect.placeholder.path.md) automatically for you when checks fail.

You can create a proxy inline with [createProxy()](./expect.createproxy.md)<!-- -->, or use [withProxy()](./expect.withproxy.md) to have one automatically created and provided for you; whichever style you prefer.

Note that proxies are *ONLY* intended to be used on the _left_ side of checks (ie; the [actual](./expect.placeholder.actual.md) value). Using a proxy on the right side (ie; the [expected](./expect.placeholder.expected.md) value) is _undefined_ behavior, and depending on the method may result in a warning to your console.

## Example


```ts
withProxy(person, (proxy) => {
  expect(proxy.parent.cars).to.be.empty();
});
```
Error message:

```logs
Expected parent.cars to be empty, but it had 2 elements.
```
