const Product = require('../models/Product');

const Query = {
    product: (_, { id }) => Product.findById(id),
    products: () => Product.find(),
};

const Mutation = {
    createProduct: (_, { title, description, price }) => Product.create({
        title, description, price, active: true, status: true
    }),

    deleteProduct: async(_, { id }) => {
        const product = await Product.findByIdAndRemove(id);
        return product ? product : new Error('No product found.')
	},
};

module.exports = {
	Query,
	Mutation
}