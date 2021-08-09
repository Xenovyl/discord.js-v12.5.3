module.exports = (Discord, client, channel) => {
    let log = client.channels.cache.get('832167338668195850');
    
    const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle("Channel DELETED")
        .setDescription(`**Name:** \`${channel.name}\`\n**ID:** \`${channel.id}\`\n**Type:** \`${channel.type}\``)
    log.send(embed);
};