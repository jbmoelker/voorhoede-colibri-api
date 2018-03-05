const marked = require('marked')
const renderCodeBlock = require('./render-code-block')

/**
 * Takes markdown, parses it and returns HTML
 * @param {string} [markdown]
 * @returns {string} Parsed markdown as HTML string
 */
module.exports = function markdownToHtml(markdown = '') {
  const renderer = new marked.Renderer()
  renderer.code = renderCodeBlock

  return marked(markdown, { renderer })
}
