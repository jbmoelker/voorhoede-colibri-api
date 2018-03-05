const { GraphQLString, GraphQLObjectType } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'Blog',
  description: '',
  fields: {
    title: { type: GraphQLString },
    subtitle: { type: GraphQLString },
    description: { type: GraphQLString },
    keywords: { type: GraphQLString },
  }
})
