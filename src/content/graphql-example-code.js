const apiUrl = `{{ baseUrl }}/graphql`

function graphqlRequest(query) {
  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  })
  .then(response => response.json())
  .then(json => json.data)
}

graphqlRequest(`
  query {
    blog { title subtitle description keywords }
    posts {
      title slug publishDate
      authors {
        name
        image { url }
      }
    }
  }
`)
.then(data => console.log(data))
