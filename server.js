"use strict";
var express = require('express');
var expressGraphQL = require('express-graphql').graphqlHTTP;
var schema = require('./src/graphql/schema/schema');
var cors = require('cors');
var db = require('./src/config/database');
db.authenticate()
    .then(function () { return console.log('Database connected'); })
    .catch(function (err) { return console.log('Error ', err); });
var app = express();
app.use(cors());
app.use('/api', expressGraphQL({
    schema: schema,
    graphiql: true
}));
var PORT = process.env.PORT || 8900;
app.listen(PORT, function () {
    console.log('Listening at yea ', PORT);
});
