const { GraphQLServer } = require('graphql-yoga');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://doge:doge@cluster0-iivj7.mongodb.net/test?retryWrites=true&w=majority',{
  useNewUrlParser: true,
});

const options = { port: process.env.PORT || '4000' }

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(options, () =>
  console.log(`Server is running ⚡ on localhost:${options.port}`),
).catch(err => console.error('connection Error', err));
