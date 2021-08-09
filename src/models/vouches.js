const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true,
}

const vouchSchema = mongoose.Schema({
    userId: reqString,
    guildId: reqString,
    vouches: { type: Number, default: 0, },
    lastGave: Date,
})

const model = mongoose.model("Vouches", vouchSchema);

module.exports = model;