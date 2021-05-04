const express = require('express')

const router = express.Router()
const account = require('./account')

router.use('/account', account)

router.get('/list', (req, res) => {
    res.status(200).send({ success: 1, message: 'success' })
})

module.exports = router
