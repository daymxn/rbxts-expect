---
id: expect.setdefaultexpectconfig
title: setDefaultExpectConfig() function
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [setDefaultExpectConfig](./expect.setdefaultexpectconfig.md)

## setDefaultExpectConfig() function

Sets the default [ExpectConfig](./expect.expectconfig.md)<!-- -->.

**Signature:**

```typescript
declare function setDefaultExpectConfig(config: Partial<ExpectConfig>): void;
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

config


</td><td>

Partial&lt;[ExpectConfig](./expect.expectconfig.md)<!-- -->&gt;


</td><td>

Partial [ExpectConfig](./expect.expectconfig.md) with settings to use.


</td></tr>
</tbody></table>
**Returns:**

void

## Remarks

Will override any previous configuration set. It does _not_ merge them.
