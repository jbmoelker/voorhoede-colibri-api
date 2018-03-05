const { GraphQLBoolean, GraphQLList, GraphQLString, GraphQLObjectType } = require('graphql')
const BodyItemType = require('./body-item')
const ImageType = require('./image')
const NavItemType = require('./nav-item')
const SocialType = require('./social')
const PersonType = require('./person')

module.exports = new GraphQLObjectType({
  name: 'Post',
  description: '',
  fields: {
    body: { type: GraphQLString },
    bodyItems: { type: new GraphQLList(BodyItemType) },
    images: { type: new GraphQLList(ImageType) },
    teaser: { type: GraphQLString },
    authors: { type: new GraphQLList(PersonType) },
    social: { type: SocialType },
    publishDate: { type: GraphQLString },
    published: { type: GraphQLBoolean },
    slug: { type: GraphQLString },
    title: { type: GraphQLString },
    navItems: { type: new GraphQLList(NavItemType) },
  }
})
