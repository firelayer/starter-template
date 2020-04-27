<p align="center">
  <a href="https://firelayer.io/">
    <img src="https://user-images.githubusercontent.com/3942799/78354991-d7925800-75a4-11ea-9185-c558cf601e25.png" alt="Firelayer" height="180" />
  </a>
</p>

<p align="center">Firelayer Starter - The default template for firelayer init</p>

<br/>

## Getting Started

Install firelayer globally:

```sh
npm i -g @firelayer/cli
```

And initialize a new project:
```sh
firelayer init new-project -t starter
```

Once it's installed, you can `cd new-project` and `yarn www` and it will run the development server on your local machine. 

### Documentation

[Documentation Website](https://firelayer.io)

## Development

Firelayer is organized as a monorepo using [Lerna](https://lerna.js.org/) and yarn workspaces. Useful scripts include:

#### `yarn bootstrap`
> Installs package dependencies and links packages together - using lerna and yarn workspaces

#### `yarn build`
> Cleans the previous builds and starts building on all sub packages - using lerna run build

#### `yarn dev`
> Starts the dev mode on all sub packages - using lerna run dev

## License

The Firelayer framework is open-sourced software licensed under the [MIT license](https://github.com/firelayer/firelayer/blob/master/LICENSE).
