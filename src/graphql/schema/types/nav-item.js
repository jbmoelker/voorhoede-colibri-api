const { GraphQLInt, GraphQLString, GraphQLObjectType } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'NavItem',
  description: '',
  fields: {
    id: { type: GraphQLString },
    html: { type: GraphQLString },
    level: { type: GraphQLInt },
  }
})
