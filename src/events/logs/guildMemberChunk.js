module.exports = (Discord, client, members, guild) => {
    let log = client.channels.cache.get('832167338668195850');

    const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle("MEMBER CHUNK / RAID - " + members.length + " Members")
    members.map((user, index) => `${index}) - ${user} - ${user.tag} - \`${user.id}\``)
    log.send(embed);
};