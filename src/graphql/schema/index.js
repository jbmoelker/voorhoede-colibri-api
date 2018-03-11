const dataLoader = require('../../data-loader')
const { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql')
const BlogType = require('./types/blog')
const ContactType = require('./types/contact')
const EventOverviewType = require('./types/event-overview')
const EventType = require('./types/event')
const HomeType = require('./types/home')
const JobType = require('./types/job')
const LanguageType = require('./types/language')
const PostType = require('./types/post')
const ProjectType = require('./types/project')
const TeamType = require('./types/team')
const WorkType = require('./types/work')

const models = require('../../models')

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
    eventOverview: {
      type: EventOverviewType,
      args: {
        language: { type: new GraphQLNonNull(LanguageType) },
      },
      resolve: (_, args) => dataLoader.load('event-overview')
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
      resolve: (_, { language }) => models.Job.find({ language })
    },
    job: {
      type: JobType,
      args: {
        language: { type: new GraphQLNonNull(LanguageType) },
        slug: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { language, slug }) => models.Job.findOne({ language, slug })
      ,
    },
    posts: {
      type: new GraphQLList(PostType),
      args: {
        first: { type: GraphQLInt },
        offset: { type: GraphQLInt },
      },
      resolve: (_, { first: limit, offset }) => models.Post.find({ limit: first, offset })
    },
    post: {
      type: PostType,
      args: {
        slug: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { slug }) => models.Post.findOne({ slug })
      ,
    },
    projects: {
      type: new GraphQLList(ProjectType),
      args: {
        first: { type: GraphQLInt },
        language: { type: new GraphQLNonNull(LanguageType) },
        offset: { type: GraphQLInt },
      },
      resolve: (_, { language, first: limit, offset }) => models.Project.find({ language, limit, offset })
    },
    project: {
      type: ProjectType,
      args: {
        language: { type: new GraphQLNonNull(LanguageType) },
        slug: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { language, slug }) => models.Project.findOne({ language, slug })
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
