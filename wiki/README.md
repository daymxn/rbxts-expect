# expect website

The website for `@rbxts/expect`.

Built with docusaurus.

```sh
npm run start
```

You can use `--no-open` to avoid opening a web page on start.

```sh
npm run start -- --no-open
```

## API docs

The API docs are built from the root project directory
with an npm script.

```sh
npm run api
```

If you have the website in watch mode, it might cause a stack overflow if you
rebuild the api at the same time. To fix this, you'll have to stop watching, build the api
docs, and start watching again.

## Future work

- Add support for [search](https://docusaurus.io/docs/search)
