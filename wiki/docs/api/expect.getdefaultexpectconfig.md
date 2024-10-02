---
id: expect.getdefaultexpectconfig
title: getDefaultExpectConfig() function
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [getDefaultExpectConfig](./expect.getdefaultexpectconfig.md)

## getDefaultExpectConfig() function

Gets the (current) default [ExpectConfig](./expect.expectconfig.md)<!-- -->.

**Signature:**

```typescript
declare function getDefaultExpectConfig(): ExpectConfig;
```
**Returns:**

[ExpectConfig](./expect.expectconfig.md)

## Remarks

Will use the baseline settings if the user hasn't called [setDefaultExpectConfig()](./expect.setdefaultexpectconfig.md)<!-- -->.

Instead of saving a reference to the config, consumers are expected to call this whenever they need the config.

_The returned config is a deep copy, so you can safely mutate it without impacting others._
