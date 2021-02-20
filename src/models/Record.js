const Sequelize = require('sequelize')
const db = require('../config/database')

const Record = db.define('records', {
    userId: {
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING
    }
})

module.exports = Record