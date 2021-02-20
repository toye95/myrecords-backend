"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var mutations_1 = require("../mutations/mutations");
var types_1 = require("../types/types");
var User = require('../../models/User');
var RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getRecords: {
            type: types_1.UserType,
            args: { id: { type: graphql_1.GraphQLInt } },
            resolve: function (parentValue, _a) {
                var id = _a.id;
                return User.findAll({ where: { id: id } })
                    .then(function (response) { return response[0]; });
            }
        }
    }
});
module.exports = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: mutations_1.mutation
});
