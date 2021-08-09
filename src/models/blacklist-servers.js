const mongoose = require('mongoose');

const BlacklistedServersSchema = new mongoose.Schema({
    Server: String,
});

const model = mongoose.model("Blacklisted-Servers", BlacklistedServersSchema);

module.exports = model;