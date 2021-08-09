const mongoose = require('mongoose');

const keysAdminSchema = new mongoose.Schema({
    client: String,
    keys: Array
});

const model = mongoose.model("keys-list", keysAdminSchema);

module.exports = model;