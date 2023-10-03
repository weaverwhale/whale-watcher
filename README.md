# Whale Watcher Extension

> a chrome extension tools built with Vite + React, and Manifest v3

## &#9881;&#65039; Installing

1. Check if your `Node.js` version is >= **18**.
1. Ensure that you have `yarn` installed (or use npm if you prefer)
1. Run `yarn` to install the dependencies.

## &#129497;&#8205;&#9794;&#65039; Developing

run the command

```shell
$ cd whale-watcher-extension

$ yarn dev
```

### Chrome Extension Developer Mode

1. set your Chrome browser 'Developer mode' up
1. click 'Load unpacked', and select `whale-watcher-extension/build` folder

### Nomal FrontEnd Developer Mode

1. access `http://localhost:3000/`
1. when debugging, open `/popup.html`

## &#x1f4e6;&#65039; Packing

After the development of your extension run the command

```shell
$ yarn build
```

Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store. Just take a look at the [official guide](https://developer.chrome.com/webstore/publish) to more infos about publishing.
