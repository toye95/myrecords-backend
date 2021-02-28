const Sequelize = require('sequelize')
module.exports = new Sequelize('sql3395811', 'sql3395811', 'y5tRZmDyQZ', {
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
