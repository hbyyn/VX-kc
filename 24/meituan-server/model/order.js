const mongoose = require('mongoose');

const schema  = new mongoose.Schema({
    openid: String,
    shopId: String,
    list: Array,
    pay: Number,
    status: {
        default: 0,//0:未付款   1:已付款  3:已接单  4:已完成   5:取消
        type: Number
    }
})

const Order = mongoose.model('order', schema);

module.exports = Order;