
import { 
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
 } from 'graphql'
 const Record = require('../../models/Record')


export const RecordType = new GraphQLObjectType({
    name: 'Record',
    fields: () => ({
        id: {type: GraphQLInt},
        userId: {type: GraphQLString},
        title: {type: GraphQLString},
        createdAt: {type: GraphQLString}
    })
})

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLString},
        fullname: {type: GraphQLString},
        email: {type: GraphQLString},
        hashpassword: {type: GraphQLString},
        records: {
            type: new GraphQLList(RecordType),
            resolve(parentValue, args){
                return Record.findAll({where: {userId: parentValue.id}})
                .then((response: any) => {
                    const data = response.sort((a: any,b: any) => b.id - a.id)
                    return data
                })
            }
        }
    })
})

export const LoginType = new GraphQLObjectType({
    name: 'Login',
    fields: () => ({
        id: {type: GraphQLString},
        fullname: {type: GraphQLString},
        email: {type: GraphQLString},
        token: {type: GraphQLString}
    })
})

export const ResetPasswordType = new GraphQLObjectType({
    name: 'ResetPassword',
    fields: () => ({
        id: {type: GraphQLString},
        password: {type: GraphQLString}
    })
})