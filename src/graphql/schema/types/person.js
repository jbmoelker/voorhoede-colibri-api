const { GraphQLString, GraphQLObjectType } = require('graphql')
const ImageType = require('./image')

module.exports = new GraphQLObjectType({
  name: 'Person',
  description: '',
  fields: {
    image: { type: ImageType },
    slug: { type: GraphQLString },
    lastName: { type: GraphQLString },
    name: { type: GraphQLString }
  }
})
