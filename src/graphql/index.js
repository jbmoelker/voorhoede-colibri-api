const graphqlHTTP = require('express-graphql')
const schema = require('./schema')

const graphqlServer = graphqlHTTP({
  schema,
  graphiql: true
})

module.exports = graphqlServer
