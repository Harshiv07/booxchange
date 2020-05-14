const mongoose = require('mongoose')

const OrdersSchema = mongoose.Schema(
    {
        ref: String,
        customerinfo: {
            email: String,
            firstName: String,
            lastName: String,
            postalCode: Number,
            phoneNumber: Number,
            address1: String,
            address2: String,
        },
        order: [
            {
                idItem: String,
                titleItem: String,
                price: Number,
                quantity: Number,
            },
        ],
        totalDelivery: Number,
        totalAmount: Number,
    },
    {
        timestamps: true,
    }
)

const Order = mongoose.model('orders', OrdersSchema)

module.exports = Order
