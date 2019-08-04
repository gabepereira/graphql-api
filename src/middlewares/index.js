const policies = require('./permissions');
const permissions = require('./permissions');
const token = require('./token');

const Policies = Object.assign(policies);
const Permissions = Object.assign(permissions);

module.exports = {
    Policies,
    Permissions,
    token
};