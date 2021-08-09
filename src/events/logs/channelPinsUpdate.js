module.exports = (Discord, client, channel, time) => {
    let log = client.channels.cache.get('832167338668195850');

    const embed = new Discord.MessageEmbed()
        .setColor('YELLOW')
        .setTitle("Channel PINS")
        .setDescription(`**Name:** \`${channel.name}\`\n**ID:** \`${channel.id}\`\n**At:** \`${time}\``)
    log.send(embed);
};