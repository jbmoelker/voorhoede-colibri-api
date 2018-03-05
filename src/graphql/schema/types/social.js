const { GraphQLString, GraphQLObjectType } = require('graphql')
const ImageType = require('./image')

module.exports = new GraphQLObjectType({
  name: 'Social',
  description: '',
  fields: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: ImageType },
  }
})
