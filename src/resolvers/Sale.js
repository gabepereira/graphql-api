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
        let product = await Product.findById(productId);
        if (!product) throw new Error('Product not found');
        console.log(productId);
        let userSale = await Sale.findOne({
            user: ctx.token.id,
            status: true,
        }, {
            items: [{
                $elemMatch: {
                    product: {
                        $exists: productId
                    }
                }
            }]
        });
        console.log(userSale);
        let condition = false;
        if (!userSale) {
            console.log('aqui');
            return createSale(ctx.token.id, productId, quantity);
        } else if (userSale.items.length < 1) {
            console.log(userSale.items.length);
            return createSale(ctx.token.id, productId, quantity);
        } else {
            console.log('update here');
        }
    },
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

const updateSale = () => {

}

module.exports = {
	Query,
	Mutation
}