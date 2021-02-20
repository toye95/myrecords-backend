"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var Record = require('../../models/Record');
exports.RecordType = new graphql_1.GraphQLObjectType({
    name: 'Record',
    fields: function () { return ({
        id: { type: graphql_1.GraphQLInt },
        userId: { type: graphql_1.GraphQLString },
        title: { type: graphql_1.GraphQLString },
        createdAt: { type: graphql_1.GraphQLString }
    }); }
});
exports.UserType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: function () { return ({
        id: { type: graphql_1.GraphQLString },
        fullname: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        hashpassword: { type: graphql_1.GraphQLString },
        records: {
            type: new graphql_1.GraphQLList(exports.RecordType),
            resolve: function (parentValue, args) {
                return Record.findAll({ where: { userId: parentValue.id } })
                    .then(function (response) {
                    var data = response.sort(function (a, b) { return b.id - a.id; });
                    return data;
                });
            }
        }
    }); }
});
exports.LoginType = new graphql_1.GraphQLObjectType({
    name: 'Login',
    fields: function () { return ({
        id: { type: graphql_1.GraphQLString },
        fullname: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        token: { type: graphql_1.GraphQLString }
    }); }
});
exports.ResetPasswordType = new graphql_1.GraphQLObjectType({
    name: 'ResetPassword',
    fields: function () { return ({
        id: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString }
    }); }
});
