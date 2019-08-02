const User = require('../models/User');

const Query = {
    user: (_, { id }) => User.findById(id),
    users: () => {
        console.log(process.env.SALT_KEY);
        return User.find()
    },
};

module.exports = Query;