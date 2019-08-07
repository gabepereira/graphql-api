const md5 = require('md5');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Product = require('../models/Product');

const Query = {
    user: (_, { id }) => User.findById(id),
    users: () => User.find(),
};

const Mutation = {
    createUser: (_, { name, email, password }) => {
		const user = User.create({
			name, email,
			password: md5(password + process.env.SALT_KEY),
			role: 'user',
			cart: []
		});
		return user ? user : new Error('Cannot create user.');
	},

	deleteUser: async(_, { id }) => {
		const user = await User.findByIdAndRemove(id);
		return user ? user : new Error('No user found.');
	},

	auth: async(_, { email, password }) => {
		const user = await User.findOne({
			email, password: md5(password + process.env.SALT_KEY)
		});
		
		return user ? {
            token: jwt.sign({
				id: user.id,
				name: user.name,
				role: user.role
			}, process.env.JWT_SECRET, { expiresIn: '1d' })
		} : new Error('No user found.');
	},
};

module.exports = {
	Query,
	Mutation
}