const crypto = require('crypto')

const SECRET_KEY = 'SHXY_8745#'

const md5 = (value) => {
    const result = crypto.createHash('md5')
    return result.update(value).digest('hex')
}

const encrypt = (value) => {
    const result = `${value}${SECRET_KEY}`
    return md5(result)
}

module.exports = { encrypt }