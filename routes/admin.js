const express = require('express')
const Admin = require('../models/admin')
const authAdmin = require('../middleware/admin_auth')

const router = express.Router()

// Route for creating a new admin
router.post('/admin/create', async (req, res) => {
    try {
        const { id, pass } = req.body

        // Check if an admin with the provided ID already exists
        const existingAdmin = await Admin.findOne({ id })
        if (existingAdmin) {
            return res.status(400).send({ message: 'Admin already exists' })
        }

        // Create a new admin
        const newAdmin = new Admin({
            id,
            pass,
        })

        // Save the new admin to the database
        await newAdmin.save()

        res.status(201).send({ message: 'Admin created successfully' })
    } catch (error) {
        console.error('Error creating admin:', error)
        res.status(500).send({ message: 'Internal server error' })
    }
})

router.post('/admin', async (req, res) => {
    try {
        const id = req.body.id
        const pass = req.body.pass

        const admin = await Admin.findByCredentials(id, pass)
        const token = await admin.generateAuthToken()
        res.status(200).send({ token })
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
