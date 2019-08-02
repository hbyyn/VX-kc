const mongoose = require('mongoose');

const schema  = new mongoose.Schema({
    openid: String,
    nickName: String,
    gender: Number,
    language: String,
    city: String,
    province: String,
    country: String,
    avatarUrl: String
})

const User = mongoose.model('user', schema);

module.exports = User;