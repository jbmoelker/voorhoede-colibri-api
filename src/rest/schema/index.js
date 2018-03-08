const Blog = require('./models/blog')
const Contact = require('./models/contact')
const Event = require('./models/event')
const EventOverview = require('./models/event-overview')
const Home = require('./models/home')
const Job = require('./models/job')
const Post = require('./models/post')
const Project = require('./models/project')
const Team = require('./models/team')
const Work = require('./models/work')

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
  basePath: '/api/v1',
  produces: ['application/json'],
  definitions: { Blog, Contact, Event, EventOverview, Home, Job, Post, Project, Team, Work },
  paths: {
    '/blog': {
      'get': {
        responses: {
          '200': {
            description: 'Blog overview',
            schema: { '$ref': '#/definitions/Blog' }
          }
        }
      }
    },
    '/contact': {
      'get': {
        parameters: [
          parameters.language,
        ],
        responses: {
          '200': {
            description: 'Contact overview',
            schema: { '$ref': '#/definitions/Contact' }
          }
        }
      }
    },
    '/event-overview': {
      'get': {
        parameters: [
          parameters.language,
        ],
        responses: {
          '200': {
            description: 'Event overview',
            schema: { '$ref': '#/definitions/EventOverview' }
          }
        }
      }
    },
    '/events': {
      'get': {
        parameters: [
          parameters.language,
          parameters.fields(Event),
        ],
        responses: {
          '200': {
            description: 'All events in given language',
            schema: {
              type: 'array',
              items: { '$ref': '#/definitions/Event' }
            }
          }
        }
      }
    },
    '/home': {
      'get': {
        parameters: [
          parameters.language,
        ],
        responses: {
          '200': {
            description: 'Home page',
            schema: { '$ref': '#/definitions/Home' }
          }
        }
      }
    },
    '/jobs': {
      'get': {
        parameters: [
          parameters.language,
          parameters.fields(Job),
        ],
        responses: {
          '200': {
            description: 'All jobs in given language',
            schema: {
              type: 'array',
              items: { '$ref': '#/definitions/Job' }
            }
          }
        }
      }
    },
    '/jobs/{slug}': {
      'get': {
        parameters: [
          parameters.slug,
          parameters.language,
          parameters.fields(Job),
        ],
        responses: {
          '200': {
            description: 'Single job by slug in given language',
            schema: { '$ref': '#/definitions/Job' }
          }
        }
      }
    },
    '/portfolio': {
      'get': {
        parameters: [
          parameters.language,
        ],
        responses: {
          '200': {
            description: 'Work overview',
            schema: { '$ref': '#/definitions/Work' }
          }
        }
      }
    },
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
    },
    '/team': {
      'get': {
        parameters: [
          parameters.language,
        ],
        responses: {
          '200': {
            description: 'Team overview',
            schema: { '$ref': '#/definitions/Team' }
          }
        }
      }
    },
  }
}
