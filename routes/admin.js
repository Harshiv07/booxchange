const express = require('express')
const ModelAdmin = require('../models/admin')
const authAdmin = require('../middleware/admin_auth')

const router = express.Router()

router.post('/admin', async (req, res) => {
    try {
        const id = req.body.id
        const pass = req.body.pass
        if (id == 'Admin@AU20' && pass == 'booXchange!!20') {
            const admin = await ModelAdmin.findByCredentials(id, pass)
            const token = await admin.generateAuthToken()
            res.status(200).send({ token })
        } else res.status(401).send()
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
})

router.get('/admin/auth', authAdmin, async (req, res) => {
    try {
        res.status(200).send({ authorization: true })
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router
