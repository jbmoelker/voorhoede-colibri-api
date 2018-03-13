# Voorhoede Colibri API

**A RESTful and a GraphQL API exposing Voorhoede website content.**

The API is backed by a [DatoCMS instance](https://voorhoede-ocelot-cms.admin.datocms.com) where content is managed.

The API and its documentation is available on [voorhoede-colibri-api.now.sh](https://voorhoede-colibri-api.now.sh/).


## Development

### Getting started

* Clone the repository.
* Copy `.env.example` to `.env`. You can find the `DATA_API_TOKEN` in the [CMS settings > API Tokens](https://voorhoede-ocelot-cms.admin.datocms.com/admin/access_tokens/4141/edit). The CMS can be accessed using the `shared@voorhoede.nl` account (details in LastPass).
* Run `npm install`. Then use any of the pre-configured [scripts](#scripts).

### Scripts

This project requires [Node.js](http://nodejs.org/) (>= v8) and [npm](https://npmjs.org/) (comes with Node).

After installing dependencies using `npm install` the following scripts are available:

`npm run ...` | Description
---|---
`data` | Downloads all data from CMS to the file system.
`deploy` | Deploys application to [now](https://zeit.co/now) and aliases latest deploy to [voorhoede-colibri-api.now.sh](https://voorhoede-colibri-api.now.sh/).
`dev` | Starts local server with auto restart on file change on [`http://localhost:2473`](http://localhost:2473).
`start` | Starts local server in production mode on [`http://localhost:2473`](http://localhost:2473).


## License

[MIT licensed](license) © [De Voorhoede](https://twitter.com/devoorhoede)
