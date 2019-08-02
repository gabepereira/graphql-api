const md5 = require('md5');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const Mutation = {
    createUser: (_, { name, email, password }) => {
        password = md5(password + process.env.SALT_KEY);
        return User.create({ name, email, password });
    },
	auth: (_, { email, password }) => {
		const user = User.findOne({
			email: email,
			password: md5(password + process.env.SALT_KEY)
		}); 

		if (!user) return;

		const data = {
            id: user._id,
            email: user.email,
            name: user.name
		};
        
        console.log(process.env.JWT_SECRET);

		return {
            token: jwt.sign(data, process.env.SALT_KEY),
            user
		}
	},
};

module.exports = Mutation;