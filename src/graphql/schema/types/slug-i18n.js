const { GraphQLString, GraphQLObjectType } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'SlugI18n',
  description: '',
  fields: {
    'en': { type: GraphQLString },
    'nl': { type: GraphQLString },
  }
})
