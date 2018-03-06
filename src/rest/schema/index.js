const Post = require('./models/post')
const Project = require('./models/project')

const parameters = {
  fields: (model) => ({
    name: 'fields',
    in: 'query',
    type: 'array',
    items: {
      type: 'string',
      enum: Object.keys(model.properties)
    },
    collectionFormat: 'multi'
  }),
  language: {
    name: 'language',
    in: 'query',
    type: 'string',
    enum: ['en', 'nl'],
    default: 'en',
  },
  limit: {
    name: 'limit',
    in: 'query',
    type: 'number',
  },
  slug: {
    name: 'slug',
    in: 'path',
    type: 'string',
    required: true,
  },
}

module.exports = {
  swagger: '2.0',
  info: {
    title: 'Voorhoede Colibri API',
    version: 'v1',
  },
  basePath: '/api',
  produces: ['application/json'],
  definitions: { Post, Project },
  paths: {
    '/posts': {
      'get': {
        parameters: [ parameters.fields(Post), parameters.limit ],
        responses: {
          '200': {
            description: 'All posts',
            schema: {
              type: 'array',
              items: { '$ref': '#/definitions/Post' }
            }
          }
        }
      }
    },
    '/posts/{slug}': {
      'get': {
        parameters: [
          parameters.slug,
          parameters.fields(Post)
        ],
        responses: {
          '200': {
            description: 'Single post by slug',
            schema: { '$ref': '#/definitions/Post' }
          }
        }
      }
    },
    '/projects': {
      'get': {
        parameters: [
          parameters.language,
          parameters.fields(Project),
        ],
        responses: {
          '200': {
            description: 'All projects in given language',
            schema: {
              type: 'array',
              items: { '$ref': '#/definitions/Project' }
            }
          }
        }
      }
    },
    '/projects/{slug}': {
      'get': {
        parameters: [
          parameters.slug,
          parameters.language,
          parameters.fields(Project),
        ],
        responses: {
          '200': {
            description: 'Single project by slug in given language',
            schema: { '$ref': '#/definitions/Project' }
          }
        }
      }
    }
  }
}
