import { UserType, LoginType, ResetPasswordType, RecordType } from "../types/types"
import { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt
 } from 'graphql'
const User = require('../../models/User')
const Record = require('../../models/Record')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateToken = (id: number, fullname: string, email: string) => {
    return jwt.sign({id, fullname, email}, 'secret', { expiresIn: "24h"})
}

export const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        createUser: {
            type: UserType,
            args: {
                fullname: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parentValue: any, { fullname, email, password }: any){
                const user = await User.findAll({where: {email}})
                if (user.length != 0){
                    throw new Error('User already exists') 
                } else { 
                    return User.create({
                        fullname,
                        email,
                        hashpassword: bcrypt.hashSync(password, 10)
                    })
                    .then((response: any) => response.dataValues)
                    .catch((e: any) => {throw new Error(e)})
                }
            }
        },

        loginUser: {
            type: LoginType,
            args: {
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parentValue: any, { email, password }: any){
                return User.findAll({where: {email}})
                .then((response: any) => {
                    if (response.length === 1 && bcrypt.compareSync(password, response[0].dataValues.hashpassword)){
                        const { id, fullname, email } = response[0].dataValues
                        const token = generateToken(id, fullname, email)
                        return { id, fullname, email, token }
                    } else {
                        throw new Error('Invalid credentials')
                    }
                }, (e: any) => {throw new Error(e)})
            }            
        },

        resetPassword: {
            type: ResetPasswordType,
            args: {
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue:any, { email, password }: any){
                return User.update({hashpassword: bcrypt.hashSync(password, 10)}, 
                {where: {email}})
                .then((response: any) => console.log(response))
            }
        },

        createRecord: {
            type: RecordType,
            args: {
                userId: {type: new GraphQLNonNull(GraphQLInt)},
                title: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue:any, { userId, title }: any){
                return Record.create({
                    userId,
                    title
                })
                .then((response: any) => response.dataValues)
            }
        },

        editRecord: {
            type: RecordType,
            args: {
                recordId: {type: new GraphQLNonNull(GraphQLInt)},
                title: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue:any, { recordId, title }: any){
                return Record.update({title}, {where: {id: recordId}})
                .then((response: any) => response)
            }
        },

        deleteRecord: {
            type: RecordType,
            args: {
                recordId: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parentValue:any, { recordId }: any){
                return Record.destroy({where: {id: recordId}})
                .then((response: any) => response)
            }
        }
    })
})