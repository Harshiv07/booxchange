const mongoose = require('mongoose')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const config = require('../config')

const Schema = mongoose.Schema

// Define our model
const adminSchema = new Schema({
    id: {
        type: String,
        unique: true,
    },
    pass: String,
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
})

adminSchema.methods.generateAuthToken = async function () {
    const admin = this
    const token = jwt.sign(
        {
            _id: admin._id.toString(),
        },
        config.secret
    )

    admin.tokens = admin.tokens.concat({ token })
    await admin.save()

    return token
}

adminSchema.statics.findByCredentials = async (id, pass) => {
    const admin = await Admin.findOne({ id })

    if (!admin) {
        throw new Error('Unable to login')
    }

    decryptedPass = crypto.AES.decrypt(admin.pass, config.secret).toString(
        crypto.enc.Utf8
    )

    if (decryptedPass != pass) {
        throw new Error('Unable to login')
    }
    return admin
}

// Hash plain text password before saving
adminSchema.pre('save', function (next) {
    const admin = this
    if (admin.isModified('pass')) {
        admin.pass = crypto.AES.encrypt(admin.pass, config.secret).toString()
    }

    next()
})

const Admin = mongoose.model('admins', adminSchema)

module.exports = Admin
