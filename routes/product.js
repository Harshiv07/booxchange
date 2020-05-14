const express = require('express')
const ModelProducts = require('../models/product')
const ModelLog = require('../models/log')

const router = express.Router()

router.get('/productsdata', async (req, res) => {
    try {
        const products = await ModelProducts.find({})
        res.send(products)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/productsdata/:id', async (req, res) => {
    const id = req.params.id

    try {
        const product = await ModelProducts.findById(id)
        if (!product) {
            return res.status(404).send()
        }
        res.send(product)
    } catch (e) {
        res.status(500).send()
    }
})

router.put('/update/item', async (req, res) => {
    const updates = Object.keys(req.body)

    try {
        const product = await ModelProducts.findById(req.body.id)
        if (!product) {
            return res.status(404).send()
        }
        updates.forEach((update) => {
            product[update] = req.body[update]
        })
        await product.save()

        const logUpdate = new ModelLog({
            type: 'Update',
            time: new Date(),
            itemid: req.body._id,
            itemtitle: req.body.title,
        })

        await logUpdate.save()

        res.send()
    } catch (e) {
        res.status(500).end()
    }
})

router.post('/add/item', async (req, res) => {
    const product = new ModelProducts(req.body)
    try {
        await product.save()

        const logAdd = new ModelLog({
            type: 'Create',
            time: new Date(),
            itemid: product._id,
            itemtitle: product.title,
        })

        await logAdd.save()
        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/delete/item', async (req, res) => {
    const id = req.body.id
    try {
        const product = await ModelProducts.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).send()
        }

        const logDelete = new ModelLog({
            type: 'Delete',
            time: new Date(),
            itemid: id,
        })
        await logDelete.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
