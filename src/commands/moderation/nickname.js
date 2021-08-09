module.exports = {
    name: 'nickname',
    aliases: ['nick'],
    description: "changes @user nickname",
    permissions: ["MANAGE_MESSAGES"],
    async execute(message, args, cmd, client, Discord) {
        const member = message.mentions.members.first() || message.member;

        if (!member) return message.reply('**Please  specify a member!**\r\n`!nickname <@user> <new Nickname>`')

        const arguments = args.slice(1).join(" ")

        if (!arguments) return message.reply("**Please specify a nickname**\r\n`!nickname <@user> <new Nickname>`")

        const embed = new Discord.MessageEmbed()
            .setColor('#4e13df')
            .setDescription(`${message.author} has successfully changed the **nickname** of ${member.user.tag} into ${member.user}`)

        try {
            member.setNickname(arguments).then(() => message.channel.send(embed));

        } catch (err) {
            message.reply("You do not have the right permissions to set" + member.toSTRING() + " a new nickname!")
        }
    }
}