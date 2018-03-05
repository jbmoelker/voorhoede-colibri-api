const { GraphQLList, GraphQLString, GraphQLObjectType } = require('graphql')
const BodyItemType = require('./body-item')
const ImageType = require('./image')
const SocialType = require('./social')

module.exports = new GraphQLObjectType({
  name: 'Service',
  description: '',
  fields: {
    itemType: { type: GraphQLString },
    images: { type: new GraphQLList(ImageType) },
    actionText: { type: GraphQLString },
    summary: { type: GraphQLString },
    body: { type: GraphQLString },
    bodyItems: { type: new GraphQLList(BodyItemType) },
    teaser: { type: GraphQLString },
    tagline: { type: GraphQLString },
    title: { type: GraphQLString },
    subtitle: { type: GraphQLString },
    icon: { type: GraphQLString },
    keywords: { type: GraphQLString },
    social: { type: SocialType },
    slug: { type: GraphQLString },
  }
})
