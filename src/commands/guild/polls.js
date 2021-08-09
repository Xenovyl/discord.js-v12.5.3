module.exports = {
    name: "poll",
    description: "starts a poll",
    permissions: ["ADMINISTRATOR"],
    async execute(message, args, cmd, client, Discord) {
        const AcceptEmoji = '820345505464582165';
        const DenyEmoji = '820345769243836427';

        let channelID = message.mentions.channels.first()
        let theDescription = args.slice(1).join(" ")

        if (!channelID) return message.reply(`**Please specify a description/question for the poll!**\r\n\`${process.env.PREFIX}poll <channel> <message>\``).then((msg) => {
            message.delete();
            msg.delete({ timeout: 5000 });
        });
        if (!theDescription) return message.reply(`**Please specify a description/question for the poll!**\r\n\`${process.env.PREFIX}poll <channel> <message>\``).then((msg) => {
            message.delete();
            msg.delete({ timeout: 5000 });
        });

        const embed = new Discord.MessageEmbed()
            .setColor("#4cc548")
            .setTitle("POLL !!")
            .setDescription(theDescription)
            .setFooter("Poll started by: " + message.author.username + '#' + message.author.discriminator)

        let msgEmbed = await channelID.send(embed)
        await msgEmbed.react(AcceptEmoji)
        await msgEmbed.react(DenyEmoji).then((msg) => {
            setTimeout(() => message.delete());
        }).catch((err) => {
            message.reply("`There was an error trying to execute this command!`");
            throw err;
        });
    },
};