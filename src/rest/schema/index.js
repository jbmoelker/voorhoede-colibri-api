const Blog = require('./definitions/blog')
const Contact = require('./definitions/contact')
const Event = require('./definitions/event')
const EventOverview = require('./definitions/event-overview')
const Home = require('./definitions/home')
const Job = require('./definitions/job')
const Post = require('./definitions/post')
const Project = require('./definitions/project')
const Team = require('./definitions/team')
const Work = require('./definitions/work')
const version = require('../version')

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
  offset: {
    name: 'offset',
    in: 'query',
    type: 'number',
  },
  language: {
    name: 'language',
    in: 'query',
    type: 'string',
    enum: ['en', 'nl'],
    required: true,
  },
  limit: {
    name: 'limit',
    in: 'query',
    type: 'number',
  },
  meta: {
    name: 'meta',
    in: 'query',
    type: 'boolean',
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
    version: version,
  },
  basePath: `/api/${version}`,
  produces: ['application/json'],
  definitions: { Blog, Contact, Event, EventOverview, Home, Job, Post, Project, Team, Work },
  paths: {
    '/blog': {
      'get': {
        parameters: [
          parameters.meta,
        ],
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
          parameters.meta,
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
          parameters.meta,
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
          parameters.limit,
          parameters.meta,
          parameters.offset,
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
          parameters.meta,
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
          parameters.meta,
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
          parameters.meta,
        ],
        responses: {
          '200': {
            description: 'Single job by slug in given language',
            schema: { '$ref': '#/definitions/Job' }
          }
        }
      }
    },
    '/posts': {
      'get': {
        parameters: [
          parameters.fields(Post),
          parameters.limit,
          parameters.offset,
          parameters.meta,
        ],
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
          parameters.fields(Post),
          parameters.meta,
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
          parameters.limit,
          parameters.offset,
          parameters.meta,
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
          parameters.meta,
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
          parameters.meta,
        ],
        responses: {
          '200': {
            description: 'Team overview',
            schema: { '$ref': '#/definitions/Team' }
          }
        }
      }
    },
    '/work': {
      'get': {
        parameters: [
          parameters.language,
          parameters.meta,
        ],
        responses: {
          '200': {
            description: 'Work overview',
            schema: { '$ref': '#/definitions/Work' }
          }
        }
      }
    },
  }
}
