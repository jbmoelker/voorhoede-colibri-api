module.exports = {
  type: 'object',
  properties: {
    contact: { type: 'object' },
    isExternalLink: { type: 'boolean' },
    linkText: { type: 'string' },
    linkUrl: { type: 'string' },
    service : { type: 'object' },
    summary: { type: 'string' },
    techniques: { type: 'string' },
    body: { type: 'string' },
    bodyItems: { type: 'array' },
    images: { type: 'array' },
    excerpt: { type: 'string' },
    keywords: { type: 'string' },
    social: { type: 'object' },
    subtitle: { type: 'string' },
    published: { type: 'boolean' },
    slug: { type: 'string' },
    title: { type: 'string' },
    navItems: { type: 'array' }
  }
}
