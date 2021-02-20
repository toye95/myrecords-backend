
import { GraphQLObjectType, GraphQLString , GraphQLSchema, GraphQLInt} from "graphql"
import { mutation } from "../mutations/mutations"
import { UserType } from "../types/types"
const User = require('../../models/User')

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getRecords: {
            type: UserType,
            args: {id: { type: GraphQLInt}},
            resolve(parentValue: any, { id }: any) {
                return User.findAll({where: {id}})
                .then((response: any) => response[0])
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})