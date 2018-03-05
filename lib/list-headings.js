const cheerio = require('cheerio')

/**
 * Return list of heading (html, id, level) in given HTML string
 * between given min-max level (default 1-6).
 *
 * @param  {String} html    HTML to find headings in
 * @param  {Object} [options]
 * @param  {Number} [options.minLevel]	Level from  where to include headings
 * @param  {Number} [options.maxLevel]	Level until where to include headings
 * @return {Object[]}       List of headings as `{ html, id, level }`
 */
module.exports = function listHeadings(html, options) {
  options = Object.assign({ minLevel: 1, maxLevel: 6 }, options)

  const $ = cheerio.load(html)
  const headings = $(':header').get()

  return headings
    .map(heading => {
      const $heading = $(heading)
      return {
        html: $heading.html(),
        id: $heading.attr('id'),
        level: parseInt(heading.tagName.substring(1))
      }
    })
    .filter(heading => (heading.level >= options.minLevel))
    .filter(heading => (heading.level <= options.maxLevel))
}
