const { GraphQLBoolean, GraphQLList, GraphQLString, GraphQLObjectType } = require('graphql')
const BodyItemType = require('./body-item')
const ImageType = require('./image')
const NavItemType = require('./nav-item')
const SocialType = require('./social')

const GridItemType = new GraphQLObjectType({
  name: 'TeamGridItem',
  description: '',
  fields: {
    callToActionLabel: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: ImageType },
    imageMobile: { type: ImageType },
    imageIsFullWidth: { type: GraphQLBoolean },
    imageIsLeft: { type: GraphQLBoolean },
    title: { type: GraphQLString },
  }
})

module.exports = new GraphQLObjectType({
  name: 'Team',
  description: '',
  fields: {
    body: { type: GraphQLString },
    bodyItems: { type: new GraphQLList(BodyItemType) },
    keywords: { type: GraphQLString },
    navItems: { type: new GraphQLList(NavItemType) },
    social: { type: SocialType },
    subtitle: { type: GraphQLString },
    teamGrid: { type: new GraphQLList(GridItemType) },
    title: { type: GraphQLString },
  }
})
