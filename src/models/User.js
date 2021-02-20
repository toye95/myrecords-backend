const Sequelize = require('sequelize')
const db = require('../config/database')

const User = db.define('user', {
    fullname: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    hashpassword: {
        type: Sequelize.STRING
    }
})

module.exports = User