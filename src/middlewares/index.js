const auth = require('./auth');

const Token = auth.Token;

const Policies = Object.assign(
    auth.Policies
);

const Permissions = Object.assign(
	auth.Permissions
);

module.exports = {
    Token,
    Policies,
    Permissions
};