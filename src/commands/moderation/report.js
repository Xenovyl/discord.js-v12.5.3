module.exports = {
    name: 'report',
    description: "report command",
    cooldown: 60,
    async execute(message, args, cmd, client, Discord) {
        if (!args[0]) return message.reply("`Please enter a message!\r\n!report <message>`");
        const messageArgs = args.join(' ');

        const newEmbed = new Discord.MessageEmbed()
            .setColor('#4e13df')
            .setTitle('Report')
            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`*${messageArgs}*`);
        message.channel.send(newEmbed).then((msg) => {
            const ResponseToUser = new Discord.MessageEmbed()
                .setColor("#4cc548")
                .setDescription("Your report will be looked over soon!")
            message.author.send(ResponseToUser);
            const SendToOwner = new Discord.MessageEmbed()
                .setColor("#4cc548")
                .setTitle("REPORT")
                .addField(`**Author:**`, message.author.tag)
                .addField(`**Content:**`, messageArgs)
            message.guild.owner.user.send(SendToOwner);
            message.delete();
        }).catch((err) => {
            throw err;
        });

    }
}