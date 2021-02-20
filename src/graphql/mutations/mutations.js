"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types/types");
var graphql_1 = require("graphql");
var User = require('../../models/User');
var Record = require('../../models/Record');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var generateToken = function (id, fullname, email) {
    return jwt.sign({ id: id, fullname: fullname, email: email }, 'secret', { expiresIn: "24h" });
};
exports.mutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: function () { return ({
        createUser: {
            type: types_1.UserType,
            args: {
                fullname: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve: function (parentValue, _a) {
                var fullname = _a.fullname, email = _a.email, password = _a.password;
                return __awaiter(this, void 0, void 0, function () {
                    var user;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, User.findAll({ where: { email: email } })];
                            case 1:
                                user = _b.sent();
                                if (user.length != 0) {
                                    throw new Error('User already exists');
                                }
                                else {
                                    return [2 /*return*/, User.create({
                                            fullname: fullname,
                                            email: email,
                                            hashpassword: bcrypt.hashSync(password, 10)
                                        })
                                            .then(function (response) { return response.dataValues; })
                                            .catch(function (e) { throw new Error(e); })];
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            }
        },
        loginUser: {
            type: types_1.LoginType,
            args: {
                email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve: function (parentValue, _a) {
                var email = _a.email, password = _a.password;
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        return [2 /*return*/, User.findAll({ where: { email: email } })
                                .then(function (response) {
                                if (response.length === 1 && bcrypt.compareSync(password, response[0].dataValues.hashpassword)) {
                                    var _a = response[0].dataValues, id = _a.id, fullname = _a.fullname, email_1 = _a.email;
                                    var token = generateToken(id, fullname, email_1);
                                    return { id: id, fullname: fullname, email: email_1, token: token };
                                }
                                else {
                                    throw new Error('Invalid credentials');
                                }
                            }, function (e) { throw new Error(e); })];
                    });
                });
            }
        },
        resetPassword: {
            type: types_1.ResetPasswordType,
            args: {
                email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve: function (parentValue, _a) {
                var email = _a.email, password = _a.password;
                return User.update({ hashpassword: bcrypt.hashSync(password, 10) }, { where: { email: email } })
                    .then(function (response) { return console.log(response); });
            }
        },
        createRecord: {
            type: types_1.RecordType,
            args: {
                userId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve: function (parentValue, _a) {
                var userId = _a.userId, title = _a.title;
                return Record.create({
                    userId: userId,
                    title: title
                })
                    .then(function (response) { return response.dataValues; });
            }
        },
        editRecord: {
            type: types_1.RecordType,
            args: {
                recordId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve: function (parentValue, _a) {
                var recordId = _a.recordId, title = _a.title;
                return Record.update({ title: title }, { where: { id: recordId } })
                    .then(function (response) { return response; });
            }
        },
        deleteRecord: {
            type: types_1.RecordType,
            args: {
                recordId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) }
            },
            resolve: function (parentValue, _a) {
                var recordId = _a.recordId;
                return Record.destroy({ where: { id: recordId } })
                    .then(function (response) { return response; });
            }
        }
    }); }
});
