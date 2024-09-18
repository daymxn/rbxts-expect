# Plan

Actually, lets take a step back and look at our existing testing assertions and think about what we want
from a new lib that we're missing.

Easy extensability. Like if I wanna add option support via a `rbxts/assertions-options` or something.

Cleaner mapping.

```ts
// Instead of this:
expect(FailureType[result.failType]).to.equal("DIFFERENT_TYPES");
expect(result.leftValue).to.equal(5);
expect(result.leftType).to.equal("number");
expect(result.rightValue).to.equal("5");
expect(result.rightType).to.equal("string");
// this:

expect(result).to.match({
  failType: FailureType.DIFFERENT_TYPES, // proper enum support instead of numbers and shit (print key name)
  leftValue: 5,
  leftType: "number",
  rightValue: "5",
  rightType: "string",
});
```

Array/table type equals.

```ts
// before
expect(encode(result.rightMissing)).to.equal("[3]");
// after
expect(result.rightMissing).to.equal([3]);
```

isEmpty support

```ts
// before
expect(result.leftMissing.isEmpty()).to.equal(true);
// after
expect(result.leftMissing).to.be.empty();
```

includes support

```ts
// before
expect(includes(message, "Hello world!")).to.equal(true);
// after
expect(message).to.include("Hello world!");
```

oneOf support

```ts
// before
const possibleLevels = [LogLevel.WARNING, LogLevel.ERROR];
for (const message of messages) {
  expect(possibleLevels).to.contain(message.level);
}
// after
const possibleLevels = ;
for (const message of messages) {
  expect(message.level).to.be.oneOf([LogLevel.WARNING, LogLevel.ERROR]);
  // or
  expect(message.level).to.be.enumOf([LogLevel.WARNING, LogLevel.ERROR]);
}
```

startsWith support

```ts
// before
expect(startsWith(message.text, "cool")).to.equal(true);
// after
expect(message.text).to.startWith("cool");
```

deep equals

```ts
// before
expect(deepEquals(position, { X: 1, Y: 2 })).to.equal(true);
// after
expect(position).to.deepEqual({ X: 1, Y: 2 });
```

method calling (maybe a roblox-ts limitation)

```ts
// before
expect(() => context.use()).to.throw("dead");
// after
expect(context.use).to.throw("dead");
```

size support

```ts
// before
expect(messages.size()).to.equal(1);
// after
expect(messages).to.have.lengthOf(1);
// or
expect(messages).to.have.length(1);
// or
expect(messages).to.have.size(1);
```

## chai-like

Lets evaluate if we wanna be more chai-like or more kotlinx-like.

## Chai like

Chains:

- to
- be
- been
- is
- that
- which
- and
- has
- have
- with
- at
- of
- same
- but
- does
- still
- also

Flags:

- `not`: inverts the assertion
- `deep`: enabled deep equality comparison for objects
- `any`: asserts that at least one member of an array/object passes the check
- `all` asserts that all provided keys/properties are present
- `ok` is truthy
- `true`/`false` is strictly `true` or `false`
- `null`/`undefined` value is `null` or `undefined`
- `empty` that an object/array/string is empty
- `exist` value is not null or undefined
- `nested` Enables dot- and bracket-notation in all .property and .include assertions that follow in the chain.
- `ordered` causes all `.members` assertions that follow in the chain to require that members be in the same order.
  - When combined with `include`, the ordering begins at the start of both arrays
- `positive` number is positive
- `negative` number is negative
- `finite` is number and not +- math.huge

Methods:

- `a`/`an` asserts the type
  - When used as a property it's just a chain
- `include`/`contains` object/array contains a subset of values
- `above`/`gt` number is greater than another
- `least`/`gte` number is greater than or equal to another
- `below`/`lt` number is less than another
- `most`/`lte` number is less than or equal to another
- `within` number is within a range
- `lengthOf` length of array/string
- `property` has a specific key
- `instanceOf` instance of a class (anyway to impl this? or should be just bundle with `a`/`an`?)
- `equal` is strictly equal (`===`)
- `eql` is deeply equal (similiar to `deep`, but doesn't cause `deep` comparison for assertions followed in the chain)
- `match`/`matches` string matches regex
- `string` string contains substring
- `keys` has the given keys (ignoring values), could be varag or array of strings
- `throw` invokes the target function and asserts that it throws, optionally matching the message to regex
- `respondTo` has a method with the given name
- `satisfy` user provided callback function that returns truthy to pass, with optional err message
- `clostTo` number is within delta
- `members` array has the same members
- `oneOf` target is a member of the given list
