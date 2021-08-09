const mongoose = require('mongoose');

const premium = new mongoose.Schema({
    User: String,
});

const model = mongoose.model("premium-users", premium);

module.exports = model;