const user = require('./User');
const product = require('./Product');

const Query = Object.assign(
	user.Query,
	product.Query
);

const Mutation = Object.assign(
	user.Mutation,
	product.Mutation
);

module.exports = {
  Query,
  Mutation
}