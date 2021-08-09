module.exports = {
    name: 'guild',
    description: 'List of servers',
    aliases: ['guilds'],
    async execute(message, args, cmd, client, Discord) {
        if (message.author.id !== '307921446225838080' && message.author.id !== "823317775874392084") return message.channel.send('Who are you?');
        let serverlist = ''
        client.guilds.cache.forEach((guild) => {
            serverlist = serverlist.concat("**Guild Name**:" + ` \`${guild.name}\`` + `\r\n**Guild ID**:` + ` \`${guild.id}\`` + `\r\n**Members**:` + ` \`${guild.memberCount}\`` + `\r\n\r\n`)
        })

        const embed = new Discord.MessageEmbed()
            .setColor("#00FB04'")
            .setTitle(`Servers that have Bot`, '')
            .setDescription(serverlist)
        message.channel.send(embed);
    }
}