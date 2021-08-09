module.exports = (Discord, client, oldVoice, newVoice) => {
    let user = client.users.cache.get(newVoice.id);
    let log = client.channels.cache.get('832167338668195850');
    let oldvoice = client.channels.cache.get(oldVoice.channelID);
    let newvoice = client.channels.cache.get(newVoice.channelID);

    const embed = new Discord.MessageEmbed()
        .setColor('#303331')
    if (newvoice) return embed.setDescription(`**Member**: <@${user.id}> (${user.id})\r\n\r\n **Joined in**: ${newvoice}`), log.send(embed);
    if (oldvoice && !newvoice) return embed.setDescription(`**Member**: <@${user.id}> (${user.id})\r\n\r\n **Out from**: ${oldvoice}`), log.send(embed);
};