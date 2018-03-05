const { GraphQLInt, GraphQLString, GraphQLObjectType } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'ImageItem',
  description: '',
  fields: {
    type: { type: GraphQLString },
    alt: { type: GraphQLString },
    title: { type: GraphQLString },
    src: { type: GraphQLString },
    format: { type: GraphQLString },
    height: { type: GraphQLInt },
    width: { type: GraphQLInt },
  }
})
