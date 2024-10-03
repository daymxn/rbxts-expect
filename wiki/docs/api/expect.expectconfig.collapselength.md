---
id: expect.expectconfig.collapselength
title: ExpectConfig.collapseLength property
hide_title: true
---

[@rbxts/expect](./expect.md) &gt; [ExpectConfig](./expect.expectconfig.md) &gt; [collapseLength](./expect.expectconfig.collapselength.md)

## ExpectConfig.collapseLength property

The length at which collapsible values become collapsed variants.

**Signature:**

```typescript
collapseLength: number;
```

## Remarks

When actual/expected values are beyond this length in size (as strings), they are converted into "collapsed" versions of themselves.

Arrays are collapsed to `[...]` Objects are collapsed to `{...}` Strings are collapsed to `"..."` And everything else is collapsed to `'...'`
