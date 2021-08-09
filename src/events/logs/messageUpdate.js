module.exports = async (Discord, client, old, message) => {
    let log = client.channels.cache.get('832167338668195850');

    if (!message.guild || old.content === message.content || message.author.bot) return;

    const embed = new Discord.MessageEmbed()
        .setColor('#206694')
        .setTitle('Message Updated')
        .setDescription([
            `**❯  Author:** \`${old.author.tag}\` (\`${old.author.id}\`)`,
            `**❯  Message ID:** \`${old.id}\``,
            `**❯  Channel:** ${old.channel}\r\n\u200b`,
        ])
        .setURL(old.url)
        .addField(`**OLD**`, old.content)
        .addField(`**NEW**`, message.content)
    log.send(embed);
};