const md5 = require('md5');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const Query = {
    user: (_, { id }) => User.findById(id),
    users: () => User.find(),
};

const Mutation = {
    createUser: (_, { name, email, password }) => User.create({
		name, email, password: md5(password + process.env.SALT_KEY)
	}),

	auth: async(_, { email, password }) => {
		const user = await User.findOne({
			email, password: md5(password + process.env.SALT_KEY)
		});
		
		return user ? {
            token: jwt.sign({
				id: user._id,
				email: user.email,
				name: user.name
			}, process.env.JWT_SECRET, { expiresIn: '1d' })
		} : new Error('No user found.');
	},
};

module.exports = {
	Query,
	Mutation
}