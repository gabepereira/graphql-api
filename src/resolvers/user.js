const md5 = require('md5');
const User = require('../models/User');

module.exports = {
  Query: {
    user: (_, { id }) => User.findById(id),
    users: () => User.find(),
  },

  Mutation: {
    createUser: (_, { name, email, password }) => {
      password = md5(password + process.env.SALT_KEY);
      return User.create({ name, email, password });
    },
  }
};