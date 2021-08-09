module.exports = {
    name: "bugreport",
    aliases: ['bug', 'reportbug', 'report-bug'],
    description: 'let users report bugs',
    async execute(message, args, cmd, client, Discord) {
        const channel = message.guild.channels.cache.find(c => c.name === 'cmds');
        const query = args.join(' ');
        if (!query) return message.reply('**Please specify the bug**\r\n`!bug <message>`').then((msg) => {
            setTimeout(() => message.delete());
        });

        const reportEmbed = new Discord.MessageEmbed()
            .setColor('#4e13df')
            .setTitle('New Bug!')
            .addField('Author', message.author.toString(), true)
            .addField('Guild', message.guild.name, true)
            .addField('Report', query)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        channel.send(reportEmbed).then((msg) => {
            setTimeout(() => message.delete());
        })
            .catch((err) => {
                message.reply("`There was an error trying to execute this command!`");
                throw err;
            });

        message.reply("**Bug report has been sent!**")
    }
}