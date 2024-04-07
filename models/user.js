const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const crypto = require('crypto-js')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },
    address1: {
        type: String,
        required: false,
    },
    address2: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    decryptedPassword = crypto.AES.decrypt(
        user.password,
        process.env.secret
    ).toString(crypto.enc.Utf8)

    if (decryptedPassword != password) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.secret)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

// Hash plain text password before saving

userSchema.pre('save', function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = crypto.AES.encrypt(
            user.password,
            process.env.secret
        ).toString()
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
