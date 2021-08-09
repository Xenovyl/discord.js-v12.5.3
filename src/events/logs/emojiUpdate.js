module.exports = (Discord, client, oldEmoji, newEmoji) => {
    let log = client.channels.cache.get('832167338668195850');

    if (oldEmoji.name !== newEmoji.name) {
        const embed = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setTitle("EMOJI NAME CHANGED")
            .setDescription(`__Emoji: ${newEmoji}__ \n\n**Before:** \`${oldEmoji.name}\`\n**After:** \`${newEmoji.name}\`\n**Emoji ID:** \`${newEmoji.id}\``)
        log.send(embed);
    }
};