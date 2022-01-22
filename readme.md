# Image Processing API

## Description

This Project is the first project in the [egFWD](https://egfwd.com/) initiative (full-stack nanodegree).
It processes the requested image, creates a thumbnail of it with the provided dimensions
and saves it to reuse later if someone asks for the same dimensions,

## Prerequisites

You must have these installed on your machine:

- [node](https://nodejs.org/en/download/) v12 or higher.
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) v6 or higher.

## Instructions

After downloading the project here's a couple of things you should do in order to run it:

- Head to the project folder through your terminal and run these commands

```
npm install
npm start
```

- Then open your browser and go to `http://localhost:3000` or with the written port in your .env file.

#### Other Scripts

```bash
# to run the tests
$ npm test
# compiling the ts files
$ npm run build
# compiling the ts files
$ npm run start:dev
# compiling the ts files
$ npm run start:prod
# to fix any format issues using prettify
$ npm run format
# the linting command using eslint
$ npm run lint
```

## Documentation

- Using the following format, you can provide your desired width & height of any image in `images` folder
  and a thumbnail with these dimensions will be created in `public/thumbnails`.
  > `http://localhost:3000/resize-image?filename=image1&width=200&height=200`
- if you didn't provide any width or height, you will get an error message.

- The thumbnail will be created in the first time only, after that it will be served from the thumbnails folder directly.

- you will get `400` if there is a problem with any of the request queries and will get `404` if you asked for non existing image or there is no `images` folder.
