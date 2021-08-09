const mongoose = require('mongoose');

const keysUserSchema = new mongoose.Schema({
    user: String,
    key: String
});

const model = mongoose.model('keys-users', keysUserSchema);
``
module.exports = model;