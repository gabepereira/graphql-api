const path = require('path');
const { fileLoader } = require('merge-graphql-schemas');
const resolvers = fileLoader(path.join(__dirname, './*.res.js'));
module.exports = resolvers;