const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const app = express()
const router = require('./routers')

app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('Ghost'))

app.use(router)

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})