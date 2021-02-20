
const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const schema = require('./src/graphql/schema/schema')
const cors = require('cors')
const db = require('./src/config/database')

db.authenticate()
.then(() => console.log('Database connected'))
.catch((err: Error) => console.log('Error ', err))


const app = express()

app.use(cors())
app.use('/api', expressGraphQL({
    schema,
    graphiql: true
}))

const PORT = process.env.PORT || 8900 

app.listen(PORT, () => {
    console.log('Listening at yea ', PORT)
})