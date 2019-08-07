const user = require('./User');
const product = require('./Product');
const sale = require('./Sale');

const Query = Object.assign(
	user.Query,
	product.Query,
	sale.Query
);

const Mutation = Object.assign(
	user.Mutation,
	product.Mutation,
	sale.Mutation
);

module.exports = {
  Query,
  Mutation
}