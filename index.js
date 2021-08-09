const Discord = require('discord.js');
require('dotenv').config();
require('discord-reply');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const mongoose = require('mongoose');

const memberCounter = require('./src/counters/memberCounter');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.cacheMsgs = [];

['commands', 'events'].forEach(handler => {
    require(`./src/handlers/${handler}`)(client, Discord);
});

mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Connected to the database!');
}).catch((err) => {
    console.log(err);
});

require('./dashboard/website');
require('discord-buttons')(client);

client.login(process.env.DISCORD_TOKEN);