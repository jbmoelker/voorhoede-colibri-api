const { GraphQLBoolean, GraphQLList, GraphQLString, GraphQLObjectType } = require('graphql')
const BodyItemType = require('./body-item')
const NavItemType = require('./nav-item')
const ProjectType = require('./project')
const ServiceType = require('./service')
const SocialType = require('./social')

module.exports = new GraphQLObjectType({
  name: 'Work',
  description: '',
  fields: {
    body: { type: GraphQLString },
    bodyItems: { type: new GraphQLList(BodyItemType) },
    highlights: { type: new GraphQLList(ProjectType) },
    keywords: { type: GraphQLString },
    navItems: { type: new GraphQLList(NavItemType) },
    projects: { type: new GraphQLList(ProjectType) },
    portfolioTitle: { type: GraphQLString },
    portfolioSubitle: { type: GraphQLString },
    services: { type: new GraphQLList(ServiceType) },
    servicesDescription: { type: GraphQLString },
    servicesHeader: { type: GraphQLString },
    social: { type: SocialType },
    subtitle: { type: GraphQLString },
    title: { type: GraphQLString },
  }
})
