const User = require('../models/User');

const Query = {
    user: (_, { id }) => User.findById(id),
    users: () => User.find(),
};

module.exports = Query;