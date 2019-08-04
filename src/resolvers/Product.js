const Product = require('../models/Product');

const Query = {
    product: (_, { id }) => Product.findById(id),
    products: () => Product.find(),
};

const Mutation = {
    createProduct: (_, { title, description, price }) => Product.create({
        title, description, price, active: true
    }),
};

module.exports = {
	Query,
	Mutation
}