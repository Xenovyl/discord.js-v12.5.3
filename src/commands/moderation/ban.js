module.exports = {
    name: "ban",
    permissions: ["BAN_MEMBERS"],
    description: {
        usage: "<prefix><command> <@user> <reason>",
        content: "This command BANS a member!",
    },
    async execute(message, args, cmd, client, Discord) {
        const mentionMember = message.mentions.members.first();

        if (!args[0]) return message.reply("**You need to specify a user to ban**\r\n`!ban <@user> <reason>`");

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "**No reason given**";

        const user = message.author;

        const embed = new Discord.MessageEmbed()
            .setTitle(`BANNED`)
            .setColor('RED')
            .addField('User', mentionMember.user.tag, true)
            .addField('\u200B', '\u200B', true)
            .addField(`User's Id`, mentionMember.user.id, true)
            .addField('Reason', `${reason}`)
            .setThumbnail(mentionMember.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter(`${user.tag}`, user.displayAvatarURL({ dynamic: true }))

        if (!mentionMember) return message.channel.send("`This user is not a valid user / is no-longer in the server!`");

        if (!mentionMember.bannable) return message.channel.send("`I was unable to ban this user!`");

        const DMembed = new Discord.MessageEmbed()
            .setTitle(`You were banned from **${message.guild.name}**`)
            .setDescription(`Reason: **${reason}**`)
            .setColor("RED")
            .setTimestamp()
            .setFooter(`By ${user.tag}`, user.displayAvatarURL({ dynamic: true }))

        await mentionMember.send(DMembed);
        await mentionMember.ban({
            reason: reason
        }).then(() => message.channel.send(embed));
    }
}