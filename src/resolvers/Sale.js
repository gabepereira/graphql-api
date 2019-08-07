const Sale = require('../models/Sale');

const Query = {
    sales: async(_, {}) => Sale.findById(id),

    sales: async(_, {}) => {
        await Sale.find({},
            'user status items')
        .populate('user', 'name')
        .populate('items.product', 'title price');
    }
};

const Mutation = {
    createSale: async(_, { productId, quantity }, ctx, info) => {
        let sale = await Sale.create({
                user: ctx.token.id,
                status: true,
                items: {
                    product: productId,
                    quantity
                }
        });
        sale = await sale.populate('user', 'name')
        .execPopulate();

        console.log(sale);

        return sale;
    }
};

module.exports = {
	Query,
	Mutation
}