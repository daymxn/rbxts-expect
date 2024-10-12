<h1 align="center">
 <br>
 <br>
<img width="320" src="./static/logo.svg" alt="rbxts-expect"/>
 <br>
 <br>
 <br>
</h1>

> Test-agnostic assertion library for ROBLOX.

<p align="left">
<a alt="Released version" href="https://www.npmjs.com/package/@rbxts/rbxts-expect">
<img src="https://img.shields.io/npm/v/%40rbxts%2Fexpect?style=flat-square"></a>
<img alt="Last release date" src="https://img.shields.io/github/release-date/daymxn/rbxts-expect?label=last%20release">
<a alt="Last commit date" href="https://github.com/daymxn/rbxts-expect/commits/main/">
<img src="https://img.shields.io/github/last-commit/daymxn/rbxts-expect/main?style=flat-square"></a>
<a alt="Open issues" href="https://github.com/daymxn/rbxts-expect/issues">
<img src="https://img.shields.io/github/issues/daymxn/rbxts-expect?style=flat-square"></a>
<img alt="Code size" src="https://img.shields.io/github/languages/code-size/daymxn/rbxts-expect?style=flat-square">
<a alt="License" href="https://github.com/daymxn/rbxts-expect/blob/main/LICENSE">
<img src="https://img.shields.io/github/license/daymxn/rbxts-expect?style=flat-square"></a>
</p>

---

<br>

## Demo

```ts
import { expect } from "@rbxts/expect";
import t from "@rbxts/t";

enum Sport {
  Basketball,
  Soccer,
  Football
}

expect(5).to.be.a.number().that.equals(5);

expect("Daymon").to.have.the.substring("day");
expect("Mom").to.be.a.string().that.has.a.sizeOf(3);

expect(new Vector3(1, 2, 3)).to.equal(new Vector3(1, 2, 3));
expect({
  name: "Daymon",
  age: 24
}).to.equal({
  name: "Daymon",
  age: 24
});

expect(Sport.Basketball).to.be.the.enum(Sport, "Basketball");
expect("Football").to.be.the.enum(Sport);

expect(1).to.be.anyOf([1, 2, 3]);

expect([]).to.be.empty();
expect([1,2,3]).to.include(1);
expect([1,2,3]).to.be.an.array();
expect([1,2,3]).to.be.an.arrayOf("number");
expect([1,2,3]).to.have.the.size(3);

expect({ name: "Daymon" }).to.be.an.object().but.not.an.array();

expect(new Vector3(1,2,3)).to.be.an.instanceOf("Vector3");
expect("string").to.be.a.typeOf(t.string);
```

## Installation

Install expect with your preferred package manager.

### npm

```sh
npm install @rbxts/expect
```

### pnpm

```sh
pnpm add @rbxts/expect
```

### yarn

```sh
yarn add @rbxts/expect
```

## Overview

expect is a test-agnostic assertion library for ROBLOX, enabling assertions in tests or server-side code
without test dependencies; with a focus on more descriptive failure messages.

expect also provides a variety of [common matchers](http://rbxts-expect.daymxn.com/docs/category/matchers) out of the box, with full support for [adding your own](http://rbxts-expect.daymxn.com/docs/category/extension-guides).

## Documentation

[Quick Start](http://rbxts-expect.daymxn.com/docs/quick-start)

[API Reference](https://rbxts-expect.daymxn.com/docs/api)

[Matchers](https://rbxts-expect.daymxn.com/docs/category/matchers)

[Extension Guides](https://rbxts-expect.daymxn.com/docs/category/extension-guides)

## Features

### Common matchers

**expect** comes packages with common matchers that you'll find in most modern assertion libraries; that were previously missing from popular roblox libraries.

```ts
expect(1).to.be.anyOf([1, 2, 3]);
expect([]).to.be.empty();
expect([1,2,3]).to.include(1);
```

### Chainable matchers

Matchers return themselves, so you can write long chainable checks on values.

```ts
expect([1,2,3]).to.be.an.array()
               .that.is.not.empty()
               .and.includes(1)
               .but.does.not.include(4)
```

### Array support

In typescript, the distinction between an object and an array is pretty black and white, while in lua, this distinction is usually lost.

**expect** attempts to rectify this by providing a variety of helper methods for checking arrays- and ensuring failure outputs for array values are formatted correctly.

```text
Expected '{"name": "Daymon"}' to be an array, but it had a non number key 'name' (string)
```

```text
Expected '[1,2,3]' to be an array of type 'string', but there was an element that was a 'number'

Index: 1
Value: 1
```

```text
Expected '[1,2]' to deep equal '[1]', but there were extra elements

Expected: '[1]'
Actual: '[1,2]'
Extra Elements: '[2]'
```

### Enum support

**expect** comes with [first-class support](https://rbxts-expect.daymxn.com/docs/matchers/enums) for user-defined enums.

```text
Expected '5' (number) to be a valid enum of '(First | Second | Third)'
```

```text
Expected 'Basketball' (enum/number) to be any of '["Football", "Soccer"'
```

### Table property testing

With the power of [proxies](https://rbxts-expect.daymxn.com/docs/usage-guide#proxies), you can perform checks on your tables- and get their paths populated in your failure messages.

```text
Expected parent.cars to be empty, but it had 2 elements.

parent.cars: '["Tesla","Civic"]'
```

### Descriptive failure messages

Get more out of your failure messages, no matter what you're checking.

```text
Expected '{"name": "Daymon"}' to be an array, but it had a non number key 'name' (string)
```

### Easy extensibility

Easily add your [custom methods](https://rbxts-expect.daymxn.com/docs/extension-guides/custom-methods), or [custom properties](https://rbxts-expect.daymxn.com/docs/extension-guides/custom-properties) to use with **expect**.

You can even [publish a library of them](https://rbxts-expect.daymxn.com/docs/extension-guides/publishing)!

### Deep equals

By taking advantage of the [@rbxts/deep-equal](https://github.com/daymxn/rbxts-deep-equal) library, **expect** has full support for comparing nested object and roblox data-types.

### Test-agnostic

Since `@rbxts/expect` is test-agnostic, you can take full advantage of it outside of tests.

```ts
import { expect } from "@rbxts/expect";
import { remotes } from "./remotes";
import { saves } from "./saves";
import { pets } from "./data";

remotes.purchasePet.connect(async (player, petId) => {
  const data = saves.get(player);
  const pet = pets.get(petId);

  expect(data.money, "You don't have enough money!").to.be.gte(pet.cost);

  data.money -= pet.cost;
  data.pets.push(pet);

  data.save();

  return "Pet purchased!";
});
```

## Getting Started

So you're ready to get started with **expect**!

You can either checkout our [Quick Start](https://rbxts-expect.daymxn.com/docs/quick-start) guide, or jump straight into our [API Reference](https://rbxts-expect.daymxn.com/docs/api).

## Roadmap

* Add publishing for wally
* Add docs for lua usage
* Implement workflow for test coverage (Blocked by [lune/issues/259](https://github.com/lune-org/lune/issues/259))
* Add workflow for checking API diff and version bumping according to semver
* Add workflow for checking format/linting
* Add note in contributing about checking the api diff

## Contributing

If you're interested in contributing to **expect**, give the [CONTRIBUTING](CONTRIBUTING.md) doc a read.

## License

[Apache 2.0](/LICENSE)
