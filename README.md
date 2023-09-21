# User Event Update Plugin

This is a codemod plugin that helps migrate from `@testing-library/user-event` v13 to v14.

## Installation

To use this plugin, you need to install `codemod/cli`:

```bash
$ npm install @codemod/cli
```

## Usage

```bash
$ npx codemod --plugin ./user-event-update-plugin path/to/your/file/or/directory
```

This will update all instances of userEvent to async userEvent per their docs [here](https://github.com/testing-library/user-event/releases/tag/v14.0.0).
This is being tested for `Jest` and it also turn the second argument of `it` blocks into async functions.

## Example

```js
// before
it("should do something", () => {
  userEvent.click(screen.getByRole("button"));
});

// after
it("should do something", async () => {
  await userEvent.click(screen.getByRole("button"));
});
```

## Contributing

If you find any issues or have suggestions for improvement, please feel free to open an issue or submit a pull request.
