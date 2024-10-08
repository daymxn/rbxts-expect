# @rbxts/expect

## 2.0.1

### Patch Changes

- 072dc32: Add missing keywords to package

## 2.0.0

### Major Changes

- d88869f: Migrated `equal` to point to `deepEqual` instead of a shallow version. Added the `shallowEqual` and `shallowEquals` methods to support shallow equality. `eq` also still points to shallow equal.

### Minor Changes

- 80b86f5: Added support for the `finite` matcher
- 873feaa: Added support for the `endWith` and `endsWith` matchers
- 41cf37a: Added support for the `between` and `within` matchers
- b5d5364: Added support for the `positive` and `negative` matchers
- 9449d8c: Added support for the `match` and `matches` matchers
- 9449d8c: Added support for the `matchExactly` matcher as an alias for `deepEqual`
- d74e9e9: Added the matchers `lessThan`, `lt` and `below`
- d74e9e9: Added the matchers `lessThanOrEqualTo`, `lte` and `most`
- 80b86f5: Added support for supplying custom message overrides by providing a second argument to `expect`
- 80b86f5: Added support for the `key` and `property` matchers
- 20aa380: Added support for the `defined`, `ok`, `exist`, `exists`, `undefined`, `null` and `nil` matchers
- 15fdec0: Added support for the `containExactly` matcher
- 4ffd43d: Added support for the `startWith` and `startsWith` matchers
- 03675f0: Added support for the `some` matcher
- d74e9e9: Added the matchers `greaterThan`, `gt` and `above`
- da58032: Added support for the `true`, `false`, `truthy` and `falsy` matchers
- 22ae31e: Added support for the `even` and `odd` matchers
- e7a2d6b: Added support for the `pattern` matcher
- 80b86f5: Added support for the `satisfy` and `satisfies` matchers
- 80b86f5: Added support for the `all` matcher
- d74e9e9: Added the NOP `at` for numbers
- 94f2f58: Added support for the `near` and `closeTo` matchers
- 15fdec0: Added support for the `containExactlyInOrder` matcher
- d74e9e9: Added the matchers `greaterThanOrEqualTo`, `gte`, and `least`
- 07bd1a0: Added the `getNearestDefinedProxy` function for propagating defined values in deeply nested null chains

### Patch Changes

- 4ffd43d: Fixed an issue where `length` wasn't properly checking empty arrays and objects
- 07bd1a0: Fixed a bug that prevented proxies from indexing null values
- 15fdec0: Fixed an issue preventing `encode` from properly encoding null values
- 03675f0: Fixed an issue with `err` not throwing whenever the underlying function didn't throw
