const { rule } = require("graphql-shield");

module.exports = policies = {
    auth: rule()(
        async(parent, args, ctx, info) => ctx.token !== null
    ),

    admin: rule()(
        async(parent, args, ctx, info) => ctx.token.role === 'admin'
    ),
}