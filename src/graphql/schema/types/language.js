const { GraphQLEnumType } = require('graphql')

module.exports = new GraphQLEnumType({
  name: 'Language',
  values: {
    en: { value: "en" },
    nl: { value: "nl" },
  }
})
