const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose').set('debug', true)
const path = require('path')
require('dotenv').config()
const compression = require('compression')

//	Router Files
const adminRouter = require('./routes/admin')
const productRouter = require('./routes/product')
const orderRouter = require('./routes/order')
const logRouter = require('./routes/log')
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')

const env = process.env.NODE_ENV || 'development'

mongoose
    .connect(
        env === 'development' ? process.env.DB_URI_DEV : process.env.DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            socketTimeoutMS: 3000,
            keepAlive: true,
            reconnectTries: 3000,
        }
    )
    .then(
        function () {
            //connected successfully
            console.log('Database connection successful!')
        },
        function (err) {
            console.log(err)
        }
    )

const app = express()
app.use(compression())
app.use(cors())
env !== 'development' &&
    app.use(express.static(path.join(__dirname, 'client/build')))

env === 'development' && app.use(morgan('dev'))
app.use(bodyParser.json())

app.use('/api', adminRouter)
app.use('/api', productRouter)
app.use('/api', orderRouter)
app.use('/api', logRouter)
app.use('/api', userRouter)
app.use('/api', authRouter)

env !== 'development' &&
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'))
    })

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server running at ${port}`)
})
