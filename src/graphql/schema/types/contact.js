const { GraphQLBoolean, GraphQLList, GraphQLString, GraphQLObjectType } = require('graphql')
const BodyItemType = require('./body-item')
const NavItemType = require('./nav-item')
const SocialType = require('./social')

module.exports = new GraphQLObjectType({
  name: 'Contact',
  description: '',
  fields: {
    body: { type: GraphQLString },
    bodyItems: { type: new GraphQLList(BodyItemType) },
    keywords: { type: GraphQLString },
    navItems: { type: new GraphQLList(NavItemType) },
    social: { type: SocialType },
    subtitle: { type: GraphQLString },
    title: { type: GraphQLString },
  }
})
