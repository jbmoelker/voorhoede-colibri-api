const { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLString, GraphQLObjectType } = require('graphql')
const BodyItemType = require('./body-item')
const ImageType = require('./image')
const NavItemType = require('./nav-item')
const PersonType = require('./person')
const ServiceType = require('./service')
const SlugI18nType = require('./slug-i18n')
const SocialType = require('./social')

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
    slugI18n: { type: SlugI18nType },
    teaser: { type: GraphQLString },
    title: { type: GraphQLString },
    url: { type: GraphQLString },
  }
})
