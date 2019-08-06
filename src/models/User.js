const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: 'String',
    email: 'String',
    password: 'String',
    role: 'String',
    cart: [{
        quantity: 'Number',
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    }]
});

module.exports = mongoose.model('User', UserSchema);