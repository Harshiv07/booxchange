const mongoose = require('mongoose')

const ProductsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    images: [{ type: String }],
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    tags: [{ type: String }],
    description: String,
})

const Product = mongoose.model('product', ProductsSchema)

module.exports = Product
