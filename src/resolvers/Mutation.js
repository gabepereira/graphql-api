const md5 = require('md5');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const Mutation = {
    createUser: (_, { name, email, password }) => User.create({
		name, email, password: md5(password + process.env.SALT_KEY)
	}),
		
	auth: async(_, { email, password }) => {
		const user = await User.findOne({
			email, password: md5(password + process.env.SALT_KEY)
		});

		console.log(user);

		return user ? {
            token: jwt.sign({
				id: user._id,
				email: user.email,
				name: user.name
			}, process.env.SALT_KEY, { expiresIn: '1d' })
		} : false;
	},
};

module.exports = Mutation;