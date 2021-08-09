const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "unban",
    permissions: ["BAN_MEMBERS"],
    description: {
        usage: "<prefix><command> <@user> <reason>",
        content: "This command UNBANS a member!",
    },
    async execute(message, args, cmd, client, Discord) {
        const user = message.mentions.users.first() || message.author;

        if (!args[0]) return message.reply("**You need to specify a user's id to unban**\r\n`!unban <USER_ID> <reason>`")

        let member;

        try {
            member = await client.users.fetch(args[0])
        } catch (e) {
            console.log(e)
            return message.channel.send('Not a valid user!').then(m => m.delete({ timeout: 5000 }));
        }

        const reason = args[1] ? args.slice(1).join(' ') : 'no reason';

        const embed = new MessageEmbed()
            .setTimestamp()
            .setFooter(`${user.tag}`, user.displayAvatarURL({ dynamic: true }))

        message.guild.fetchBans().then(bans => {

            const user = bans.find(ban => ban.user.id === member.id);

            if (user) {
                embed.setTitle(`Successfully UNBANNED`)
                    .setColor('#4cc548')
                    .addField('User', user.user.tag, true)
                    .addField('\u200B', '\u200B', true)
                    .addField(`User's Id`, user.user.id, true)
                    .addField('Banned Reason', user.reason != null ? user.reason : 'no reason')
                    .addField('Unbanned Reason', reason)
                    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
                message.guild.members.unban(user.user.id, reason).then(() => message.channel.send(embed))
            } else {
                embed.setTitle(`${member.tag} isn't banned!`)
                    .setColor('#323232')
                message.channel.send(embed)
            }

        }).catch(e => {
            console.log(e)
            message.reply('`There was an error trying to execute this command!`')
        });

    }
}