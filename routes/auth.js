const express = require('express')
const passport = require('passport')
const Authentication = require('../controllers/authentication')
const auth = require('../middleware/auth')

const router = express.Router()

router.get(
    '/secret',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({ authorization: true })
    }
)
router.post(
    '/signin',
    passport.authenticate('local', { session: false }),
    Authentication.signin
)
router.post('/signup', Authentication.signup)

router.get('/auth', auth, async (req, res) => {
    try {
        res.status(200).send()
    } catch (e) {
        res.status(404).send()
    }
})
module.exports = router
