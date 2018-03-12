## GraphQL API

The [GraphQL](https://graphql.org/) API offers an alternative API query language. Rather than the resource-based REST API, the GraphQL API is client-centered. You request data by sending an empty data structure to the server, which is filled with data by the server and returned as JSON.

You can use any programming language to query the API. For instance using [vanilla JavaScript in the example below](#graphql-example). Alternatively you can use a library like [Apollo](https://www.apollographql.com/client) or [Relay](https://facebook.github.io/relay/).

### GraphQL API features

* Single endpoint for every request (`{{ baseUrl }}/graphql`).
* Requests can be refined precisely via the `query` sent as request `body`.
* All requests must be `POST` requests.
