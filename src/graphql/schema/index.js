const dataLoader = require('../../data-loader')
const { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql')
const BlogType = require('./types/blog')
const ContactType = require('./types/contact')
const EventType = require('./types/event')
const HomeType = require('./types/home')
const JobType = require('./types/job')
const LanguageType = require('./types/language')
const PostType = require('./types/post')
const ProjectType = require('./types/project')
const TeamType = require('./types/team')
const WorkType = require('./types/work')

const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    blog: {
      type: BlogType,
      resolve: (_, args) => dataLoader.load('blog')
    },
    contact: {
      type: ContactType,
      args: {
        language: { type: new GraphQLNonNull(LanguageType) },
      },
      resolve: (_, args) => dataLoader.load('contact')
        .then(pageI18n => pageI18n[args.language])
    },
    events: {
      type: new GraphQLList(EventType),
      args: {
        language: { type: new GraphQLNonNull(LanguageType) },
      },
      resolve: (_, args) => dataLoader.load('events')
        .then(itemsI18n => itemsI18n[args.language])
    },
    home: {
      type: HomeType,
      args: {
        language: { type: new GraphQLNonNull(LanguageType) },
      },
      resolve: (_, args) => dataLoader.load('home')
        .then(pageI18n => pageI18n[args.language])
    },
    jobs: {
      type: new GraphQLList(JobType),
      args: {
        language: { type: new GraphQLNonNull(LanguageType) },
      },
      resolve: (_, args) => dataLoader.load('jobs')
        .then(itemsI18n => itemsI18n[args.language])
    },
    job: {
      type: JobType,
      args: {
        language: { type: new GraphQLNonNull(LanguageType) },
        slug: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => dataLoader.load('jobs')
        .then(itemsI18n => itemsI18n[args.language])
        .then(items => items.find(item => item.slug === args.slug))
      ,
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: (_, args) => dataLoader.load('posts')
    },
    post: {
      type: PostType,
      args: {
        slug: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => dataLoader.load('posts')
        .then(items => items.find(item => item.slug === args.slug))
      ,
    },
    projects: {
      type: new GraphQLList(ProjectType),
      args: {
        language: { type: new GraphQLNonNull(LanguageType) },
      },
      resolve: (_, args) => dataLoader.load('projects')
        .then(itemsI18n => itemsI18n[args.language])
    },
    project: {
      type: ProjectType,
      args: {
        language: { type: new GraphQLNonNull(LanguageType) },
        slug: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => dataLoader.load('projects')
        .then(itemsI18n => itemsI18n[args.language])
        .then(items => items.find(item => item.slug === args.slug))
      ,
    },
    team: {
      type: TeamType,
      args: {
        language: { type: new GraphQLNonNull(LanguageType) },
      },
      resolve: (_, args) => dataLoader.load('team')
        .then(pageI18n => pageI18n[args.language])
    },
    work: {
      type: WorkType,
      args: {
        language: { type: new GraphQLNonNull(LanguageType) },
      },
      resolve: (_, args) => dataLoader.load('work')
        .then(pageI18n => pageI18n[args.language])
    },
  },
})

const schema = new GraphQLSchema({
  query: queryType,
})

module.exports = schema
