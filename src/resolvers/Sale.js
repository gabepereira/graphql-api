const Sale = require('../models/Sale');
const Product = require('../models/Product');

const Query = {
    sales: async(_, {}) => Sale.findById(id),

    sales: async(_, {}) => (
        await Sale.find({},
            'user status items')
        .populate('user', 'name')
        .populate('items.product', 'title price')
    ),
};

const Mutation = {
    createSale: async(_, { productId, quantity }, ctx, info) => {
        const product = await Product.findById(productId);
        if (!product) throw new Error('Product not found');
        let userSale = await Sale.findOne({
            user: ctx.token.id,
            status: true
        });
        if (!userSale) {
            return createSale(ctx.token.id, productId, quantity);
        } else if (userSale) {
            return updateSale(ctx.token.id, productId, quantity);
        } else throw new Error('Error creating sale');
    }
};

const createSale = async(id, product, quantity) => {
    let sale = await Sale.create({
        user: id,
        status: true,
        items: {
            product: product,
            quantity: quantity
        }
    });
    sale = await sale.populate('user', 'name')
    .populate('items.product', 'title price')
    .execPopulate();
    return sale;
}

const updateSale = async(id, product, quantity) => {
    let sale = await Sale.findOne({
        user: id,
        status: true,
        items: {
            $elemMatch: { product: product }
        }
    });
    sale = await sale.populate('user', 'name')
    .execPopulate();
    sale.items[0].quantity += quantity;
    return await sale.updateOne(sale, () => sale);
}

const deactivateSale = async id => {
    let sale = await Sale.findOneAndUpdate({
        user: id,
        status: true,
    }, {
        status: false
    }, { new: true });
    return sale;
}

module.exports = {
	Query,
	Mutation
}