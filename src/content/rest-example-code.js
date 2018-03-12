const apiUrl = `{{ baseUrl }}/api/{{ restVersion }}`

function restRequest(query) {
  return fetch(`${apiUrl}${query}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => response.json())
}

Promise.all([
  restRequest(`/blog`),
  restRequest(`/posts?fields=title,slug,publishDate&limit=3`)
])
.then(([blog, posts]) => console.log({ blog, posts }))
