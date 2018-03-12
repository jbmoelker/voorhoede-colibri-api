const markdown = require('nunjucks-markdown')
const marked = require('marked')
const nunjucks = require('nunjucks')

const renderer = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(__dirname, {
        noCache: true,
        watch: false
    }),
    { autoescape: true }
)

const markdownRenderer = new marked.Renderer()
markdownRenderer.link = (href, title, text) => {
  if (/^https?:\/\//.test(href)) {
    return `<a href="${href}" rel="noopener" target="_blank">${text}</a>`
  }
  return `<a href="${href}">${text}</a>`
}
markdownRenderer.heading = (text, number, raw) => {
  const slug = text.toString().toLowerCase().trim().replace(/\s+/g, '-')
  return `
    <h${number} id="${slug}">
      <a href="#${slug}" class="permalink">${text}</a>
    </h${number}>
  `
}

marked.setOptions({ renderer: markdownRenderer })
markdown.register(renderer, marked)

module.exports = renderer
