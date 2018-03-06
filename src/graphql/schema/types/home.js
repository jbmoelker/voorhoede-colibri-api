const { GraphQLBoolean, GraphQLList, GraphQLString, GraphQLObjectType } = require('graphql')
const BodyItemType = require('./body-item')
const NavItemType = require('./nav-item')
const ProjectType = require('./project')
const ServiceType = require('./service')
const SocialType = require('./social')

module.exports = new GraphQLObjectType({
  name: 'Home',
  description: '',
  fields: {
    body: { type: GraphQLString },
    bodyItems: { type: new GraphQLList(BodyItemType) },
    headerTitle: { type: GraphQLString },
    highlights: { type: new GraphQLList(ProjectType) },
    keywords: { type: GraphQLString },
    navItems: { type: new GraphQLList(NavItemType) },
    services: { type: new GraphQLList(ServiceType) },
    servicesDescription: { type: GraphQLString },
    servicesHeader: { type: GraphQLString },
    social: { type: SocialType },
    subtitle: { type: GraphQLString },
    title: { type: GraphQLString },
    usps: { type: GraphQLString },
  }
})
