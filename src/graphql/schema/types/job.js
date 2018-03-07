const { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLString, GraphQLObjectType } = require('graphql')
const BodyItemType = require('./body-item')
const ImageType = require('./image')
const NavItemType = require('./nav-item')
const ServiceType = require('./service')
const SocialType = require('./social')
const PersonType = require('./person')

module.exports = new GraphQLObjectType({
  name: 'Job',
  description: '',
  fields: {
    body: { type: GraphQLString },
    bodyItems: { type: new GraphQLList(BodyItemType) },
    description: { type: GraphQLString },
    keywords: { type: GraphQLString },
    navItems: { type: new GraphQLList(NavItemType)  },
    order: { type: GraphQLInt },
    published: { type: GraphQLBoolean },
    slug: { type: GraphQLString },
    teaser: { type: GraphQLString },
    title: { type: GraphQLString },
    url: { type: GraphQLString },
  }
})
