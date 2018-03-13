# REST API

The REST API returns the approriate [HTTP status codes](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes) and a JSON-based payload.

When an error occurs the server returns a non-200 status code and the response contains an `error` object like `{ "error": { "code": "NOT_FOUND", "message": "..." } }`. The message aims to be informative and human readable (and may change). The code is constant and can be used to handle errors programmatically.

You can [explore the API](#api-explorer) below or read more on [how to use the REST API](/#restful-api).

## API explorer

Base URL: `/api/{{ restVersion }}`
