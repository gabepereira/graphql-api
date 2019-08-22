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
        let sale = await Sale.findOne({
            user: ctx.token.id,
            status: true
        });
        // if (!sale) {
        //     return createSale(ctx.token.id, productId, quantity);
        // } else if (sale) {
        //     return updateSale(productId, quantity, sale);
        // } else throw new Error('Error creating sale');
        !sale ? createSale(ctx.token.id, productId, quantity) :
        sale ? updateSale(productId, quantity, sale) :
        new Error('Error creating sale');
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

const updateSale = async(product, quantity, sale) => {
    for (let i in sale.items) {
        if (sale.items[i].product == product)
        sale.items[i].quantity += quantity;
    }
    const found = sale.items.some(item => item.product == product);
    if (!found) sale.items.push({
        product: product,
        quantity: quantity
    });
    await sale.updateOne(sale, (err, doc) => 
    err ? new Error('Could not update sale') : doc);
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