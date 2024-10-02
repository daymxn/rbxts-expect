---
id: expect.assertion.value
title: Assertion.value property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [Assertion](./expect.assertion.md) &gt; [value](./expect.assertion.value.md)

## Assertion.value property

The "actual" value attached to this [expect()](./expect.expect.md) call.

**Signature:**

```typescript
readonly value: T;
```

## Remarks

Whatever argument was passed into [expect()](./expect.expect.md) is represented as the "actual" value of the assertion, and stored here.

In the case of a [Proxy](./expect.proxy.md)<!-- -->, the inner value of the proxy is stored here instead.

## Example


```ts
expect(5).to.not.equal(4); // value === 5
```
