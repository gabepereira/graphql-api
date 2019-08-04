const { rule, shield, and } = require("graphql-shield");
const jwt = require('jsonwebtoken');

const Token = req => {
    try {
      let token = jwt.verify(req.request.headers.authorization, process.env.JWT_SECRET);
      return token;
    } catch(e) { return null }
}

const Policies = {
    isAuthenticated: rule()(
        async(parent, args, ctx, info) => ctx.token !== null
    ),

    isAdministrator: rule()(
        async(parent, args, ctx, info) => ctx.token.role === 'admin'
    ),
}

const Permissions = shield({
    Query: {
        user: and(Policies.isAuthenticated),
        users: and(Policies.isAuthenticated),
    },

    Mutation: {
        createUser: and(Policies.isAdministrator),
        deleteUser: and(Policies.isAdministrator),
    }
});

module.exports = {
    Token,
    Policies,
    Permissions
}