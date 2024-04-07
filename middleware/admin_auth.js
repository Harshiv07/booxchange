const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')

const adminAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decodedId = jwt.verify(token, process.env.secret)._id
        const admin = await Admin.findOne({
            _id: decodedId,
            'tokens.token': token,
        })
        if (!admin) {
            throw new Error()
        }
        req.admin = admin
        req.token = token
        next()
    } catch (e) {
        res.status(401).send({ error: 'Unauthorized' })
    }
}

module.exports = adminAuth
