const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decodedId = jwt.verify(token, process.env.secret)._id
        const user = await User.findOne({
            _id: decodedId,
            'tokens.token': token,
        })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (e) {
        res.status(401).send({ error: 'Unauthorized' })
    }
}

module.exports = auth
