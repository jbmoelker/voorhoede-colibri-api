const { GraphQLUnionType } = require('graphql')
const HtmlItemType = require('./html-item')
const ImageItemType = require('./image-item')

module.exports = new GraphQLUnionType({
  name: 'BodyItem',
  description: '',
  types: [HtmlItemType, ImageItemType],
  resolveType(value) {
    if (value.type === 'html') {
      return HtmlItemType;
    }
    if (value.type === 'image') {
      return ImageItemType;
    }
  }
})
