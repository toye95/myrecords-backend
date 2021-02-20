"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var UserType = require('../types/types');
var User = require('../../models/User');
exports.query = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getRecords: {
            type: UserType,
            args: { id: { type: graphql_1.GraphQLInt } },
            resolve: function (parentValue, args) {
                return User.findAll({ where: { id: args.id } })
                    .then(function (response) { return response[0]; });
            }
        }
    }
});
