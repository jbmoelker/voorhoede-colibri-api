const prism = require('prismjs')
require('prismjs/components/prism-less') // adds `less` to global `prism.languages` instance
require('prismjs/components/prism-twig') // adds `twig` to global `prism.languages` instance
require('prismjs/components/prism-json') // adds `json` to global `prism.languages` instance

/**
 * Takes codeblock and code language, uses prismjs to enable syntax highlighting
 * and returns the prismized html as string
 *
 * @param {string} code
 * @param {string} language
 *
 * @returns {string} A string containing prismized html code block
 */
module.exports = function renderCodeBlock(code, language) {
  language = (prism.languages.hasOwnProperty(language)) ? language : 'markup'
  const highlightedCode = prism.highlight(code, prism.languages[language])
  return `<pre class="language-${language}"><code>${highlightedCode}</code></pre>`
}
