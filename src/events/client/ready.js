const typingPolls = require("../../events/client/typingPolls");
const memberCounter = require("../../counters/memberCounter");

module.exports = async (Discord, client) => {

    console.log('Lorenzo Bot is currently working!');

    memberCounter(client)
    typingPolls(client)

    client.user.setActivity(`KYU's servers!`, {
        type: 'STREAMING',
        url: "https://www.twitch.tv/xenovyl"
    }).then(presence => console.log(`Made by Lorеnzo#1000`)).catch(console.error);
};