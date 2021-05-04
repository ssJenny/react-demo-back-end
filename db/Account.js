const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/react_task', { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema

const accountSchema = new Schema({
    id: String,
    email: String,
    name: String,
    password: String

})

// 将文档结构发布为模型
// 第一个参数：传入一个大写字母单数形式的字符串，表示数据库名称
//              mongoose会自动将大写名词的字符串生成小学复数形式的集合名称
//  第二个参数为文档结构
const Account = mongoose.model('Account', accountSchema)

module.exports = Account