const cheerio = require('cheerio')
const splitHtml = require('split-html')
const { URL } = require('url')

module.exports = function bodyToItems (body, { images }) {
  return splitHtml(body, 'img')
    .map(html => {
      if (isImage(html)) {
        return { type: 'image', ... getImageProperties(html, images) }
      } else {
        return { type: 'html', html }
      }
    })
}

function getBaseUrl (url) {
  try {
    return (new URL(url).origin + new URL(url).pathname)
  } catch (e) {
    return url
  }
}

function isImage (html) {
  const $ = cheerio.load(html)
  const $image = $('img')
  return ($image.length > 0)
}

function getImageProperties (html, images) {
  const $ = cheerio.load(html)
  const $image = $('img')
  const url = getBaseUrl($image.attr('src'))
  const { format, height, width } = images.find(image => image.url === url) || {}
  return {
    alt: $image.attr('alt'),
    title: $image.attr('title'),
    src: url,
    format,
    height,
    width,
  }
}
