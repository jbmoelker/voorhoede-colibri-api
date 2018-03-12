## RESTful API

The [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) API is a resource-based interface to access our content. For instance you can request the blog overview content (`/blog`) or a collection of posts (`/posts`) or a single post (`/posts/{slug}`). Each resource has its own API endpoint and requires its own request. This makes the API very predictable.

You can use any programming language to query the API. For instance using [vanilla JavaScript in the example below](#rest-example).

### REST API features

* Dedicated (versioned) endpoint for each collection and singleton model (e.g. `{{ baseUrl }}/api/{{ restVersion }}/posts`).
* Requests can be refined using search query parameters (e.g. `?fields=title,slug`). These are specified per endpoint.
* Currently all endpoints only support `GET` requests.
