<a href="https://firelayer.io/">
  <img src="https://user-images.githubusercontent.com/3942799/78354854-884c2780-75a4-11ea-9882-a716e2095e98.png" alt="Firelayer" width="400" />
</a>

<br/>

Landing [https://firelayer-starter-template.web.app](https://firelayer-starter-template.web.app)


### Firelayer Documentation

[Documentation Website](https://firelayer.io/docs)

## Installation Guide
You can use an existing Firebase project or create a new project on the [Firebase Console](https://console.firebase.google.com).

Follow the guide on preparing a Firebase project for Firelayer
**[Setting up Firebase - Guide](https://firelayer.io/docs/setting-up-firebase)**

#### Starting in a new project
```sh
firelayer init new-project -t starter
```

#### Adding to a current firelayer project
```sh
firelayer add:template starter
```

## Content

#### [`apps/functions` Cloud Functions](/apps/functions/README.md)
- Express API
- User management
- Triggers examples
- Scheduled jobs examples

#### [`apps/admin` Administration Dashboard](/apps/admin/README.md)
- Firebase Users Management
- Send auth emails with SendGrid
- Vue & Vuetify Components

#### [`apps/website` Landing Page](/apps/website/README.md)
- Sign In, register, verify email and reset password
- User Dashboard
- Localization
- Vue with Nuxt & Vuetify Components


## Development

Starter template is organized as a monorepo using [Lerna](https://lerna.js.org/) and yarn workspaces. Useful scripts include:

#### `yarn bootstrap`
> Installs package dependencies and links packages together - using lerna and yarn workspaces

#### `yarn build`
> Cleans the previous builds and starts building on all sub packages - using lerna run build

#### `yarn dev`
> Starts the dev mode on all sub packages - using lerna run dev

## License

Firelayer is open-sourced software licensed under the [MIT license](https://github.com/firelayer/firelayer/blob/master/LICENSE).
