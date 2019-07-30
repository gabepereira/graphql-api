const jwt = require('jsonwebtoken');

exports.generateToken = data => jwt.sign(data, process.env.SALT_KEY, { expiresIn: '1d' });
exports.decodeToken = async token => await jwt.verify(token, process.env.SALT_KEY);