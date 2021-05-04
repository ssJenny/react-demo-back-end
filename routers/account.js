const express = require('express')
const lodash = require('lodash')
const Account = require('../db/Account')
const { nanoid } = require('nanoid')
const { encrypt } = require('../utils/encryption')

const router = express.Router()

// 登录
router.post('/signin', (req, res) => {
    const params = req.body
    if (!lodash.isEmpty(params) && lodash.every(params, Boolean)) {
        Account.find({ email: params.email }, (err, ret) => {
            const loginTime = new Date().getTime()
            const user = lodash.find(ret, { email: params.email })
            if (!user) {
                res.status(200).send({ success: 0, message: 'The email has not been registered!' })
                return
            } else if (encrypt(params.password) !== user.password) {
                res.status(200).send({ success: 0, message: 'Incorrect email or password' })
                return
            }
            const access_token = `${encrypt(params.email)}.${encrypt(params.password)}${encrypt(loginTime)}`
            res.status(200).send({ success: 1, access_token })
        })
    }
})

// 注册
router.post('/signup', (req, res) => {
    let params = req.body
    const id = nanoid()
    params = { ...params, id, password: encrypt(params.password) }
    if (!lodash.isEmpty(params) && lodash.every(params, Boolean)) {
        Account.find({ email: params.email }, (err, ret) => {
            if (ret.length) {
                res.status(200).send({ success: 0, message: 'The email has been registered!' })
                return
            }
            const user = new Account(params)
            user.save((err, result) => {
                if (err) {
                    res.status(202).sen({ success: 0, message: 'Register failed!' })
                    return
                }
                res.status(200).send({ success: 1 })
            })
        })
        
    }
})

module.exports = router
