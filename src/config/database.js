const Sequelize = require('sequelize')
module.exports = new Sequelize('sql3394102', 'sql3394102', 'cDnClRaVv2', {
    host: 'sql3.freemysqlhosting.net',
    dialect: 'mysql',
    operatorAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
        
    }
})