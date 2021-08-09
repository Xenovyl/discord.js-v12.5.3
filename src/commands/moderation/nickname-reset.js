module.exports = {
    name: 'reset-nickname',
    aliases: ['reset-nick', 'resetnick', 'resetnickname'],
    description: "resets @user's nickname",
    permissions: ["MANAGE_MESSAGES"],
    async execute(message, args, cmd, client, Discord) {
        const member = message.mentions.members.first() || message.member;

        if (!member) return message.reply('**Please  specify a member!**\r\n`!reset-nickname <@user>`')

        const embed = new Discord.MessageEmbed()
            .setColor('#4e13df')
            .setDescription(`${message.author} has successfully **resetted** the *nickname* of ${member.user.tag} into ${member.user}`)

        try {
            member.setNickname(null);

        } catch (err) {
            message.reply("You do not have the right permissions to set" + member.toSTRING() + " a new nickname!")
        }
    }
}