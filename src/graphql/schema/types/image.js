const { GraphQLInt, GraphQLObjectType, GraphQLString } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'Image',
  description: '',
  fields: {
    format: { type: GraphQLString },
    size: { type: GraphQLInt },
    width: { type: GraphQLInt },
    height: { type: GraphQLInt },
    title: { type: GraphQLString },
    alt: { type: GraphQLString },
    url: { type: GraphQLString },
  }
})
