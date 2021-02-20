import { RecordType } from "../types/types"
import { GraphQLInt, GraphQLObjectType, GraphQLString } from'graphql'
const UserType = require('../types/types')
const User = require('../../models/User')

export const query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getRecords: {
            type: UserType,
            args: {id: { type: GraphQLInt}},
            resolve(parentValue: any, args: any) {
                return User.findAll({where: {id: args.id}})
                .then((response: any) => response[0])
            }
        }
    }
})