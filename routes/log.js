const express = require('express')
const ModelLog = require('../models/log')

const router = express.Router()

router.get('/log', async (req, res) => {
    try {
        const logs = await ModelLog.find({})
        res.send(logs)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
