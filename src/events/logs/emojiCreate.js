module.exports = (Discord, client, emoji) => {
    let log = client.channels.cache.get('832167338668195850');

    const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle("EMOJI CREATED")
        .setDescription(`**__EMOJI:__** ${emoji}\n**Name:** ${emoji.name}\n**ID:** ${emoji.id}\n**URL:** ${emoji.url}`)
    log.send(embed);
};