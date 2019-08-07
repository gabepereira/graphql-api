const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: 'Boolean',
    items: [{
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }]
});

module.exports = mongoose.model('Sale', SaleSchema, 'sales');