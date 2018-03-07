const { GraphQLString, GraphQLObjectType } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'Event',
  description: '',
  fields: {
    date: { type: GraphQLString },
    description: { type: GraphQLString },
    title: { type: GraphQLString },
    url: { type: GraphQLString },
  }
})
