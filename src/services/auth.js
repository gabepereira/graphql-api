const jwt = require('jsonwebtoken');

exports.generateToken = data => jwt.sign(data, process.env.SALT_KEY, { expiresIn: '1d' });
exports.decodeToken = async token => await jwt.verify(token, process.env.SALT_KEY);

exports.authorize = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        response.send(401, res, "Acesso negado.");
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                response.send(401, res, "Token inválido.");
            } else {
                next();
            }
        });
    }
};