const { GraphQLString, GraphQLObjectType } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'HtmlItem',
  description: '',
  fields: {
    type: { type: GraphQLString },
    html: { type: GraphQLString },
  }
})
