const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    username: { type: String, required: true },
    userID: { type: String, require: true, unique: true },
    serverID: { type: String, require: true },
    bits: { type: Number, default: 1000 },
    bank: { type: Number },
    time: { type: String }
});

const model = mongoose.model("ProfileModels", profileSchema);

module.exports = model;