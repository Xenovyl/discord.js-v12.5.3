module.exports = (Discord, client, guild, user) => {
    let log = client.channels.cache.get('832167338668195850');

    const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle("USER BANNED")
        .setDescription(`**User**: ${user} (\`${user.id}\`)\n**Tag**: \`${user.tag}\``)
    log.send(embed);
};