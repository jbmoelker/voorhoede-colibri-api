const { GraphQLBoolean, GraphQLList, GraphQLString, GraphQLObjectType } = require('graphql')
const BodyItemType = require('./body-item')
const ImageType = require('./image')
const NavItemType = require('./nav-item')
const ServiceType = require('./service')
const SlugI18nType = require('./slug-i18n')
const SocialType = require('./social')
const PersonType = require('./person')

module.exports = new GraphQLObjectType({
  name: 'Project',
  description: '',
  fields: {
    body: { type: GraphQLString },
    bodyItems: { type: new GraphQLList(BodyItemType) },
    images: { type: new GraphQLList(ImageType) },
    social: { type: SocialType },
    published: { type: GraphQLBoolean },
    slug: { type: GraphQLString },
    slugI18n: { type: SlugI18nType },
    title: { type: GraphQLString },
    subtitle: { type: GraphQLString },
    excerpt: { type: GraphQLString },
    navItems: { type: new GraphQLList(NavItemType) },
    isExternalLink: { type: GraphQLBoolean },
    linkText: { type: GraphQLString },
    linkUrl: { type: GraphQLString },
    contact: { type: PersonType },
    service: { type: ServiceType },
    summary: { type: GraphQLString },
    techniques: { type: GraphQLString },
  }
})
