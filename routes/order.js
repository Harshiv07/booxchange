const express = require('express')
const ModelOrders = require('../models/order')

const router = express.Router()

router.post('/add/orders', async (req, res) => {
    const order = new ModelOrders(req.body)
    try {
        await order.save()
        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/orders', async (req, res) => {
    try {
        const orders = await ModelOrders.find({})
        res.send(orders)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
