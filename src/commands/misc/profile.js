const moment = require('moment');

module.exports = {
    name: 'profile',
    cooldown: 5,
    aliases: ['info', 'userinfo', 'user-info', 'user', 'whois'],
    description: "User info of mentioned user/id or if no one mentioned then yours.",
    async execute(message, args, cmd, client, Discord) {
        const user = message.member
        if (args[0]) user = await message.guild.members.fetch(args[0]).catch(() => null) || message.mentions.members.first() || message.member;

        const roles = user.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1);

        let x = Date.now() - user.createdAt;
        let y = Date.now() - message.guild.members.cache.get(user.id).joinedAt;

        const created = Math.floor(y / 86400000);
        const joined = Math.floor(y / 86400000);

        const joinedDate = moment.utc(user.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss");
        const DiscordCreation = moment.utc(user.user.createdAt).format("dddd, MMMM Do YYYY");

        const newEmbed = new Discord.MessageEmbed()
            .setColor('#4e13df')
            .setTitle('User Informations')
            .addFields(
                { name: 'Member', value: `<@${user.id}>`, inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
                { name: 'Discord Username', value: `${user.user.tag}`, inline: true },
                { name: 'Member ID', value: `${user.id}`, inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
                { name: 'Discord Status', value: user.presence.status, inline: true },
                { name: `Joined The Server at`, value: `${joinedDate}`, inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
                { name: 'Discord Creation', value: `${DiscordCreation}`, inline: true },
                { name: `Roles: **[${roles.length}]**`, value: `${roles}` },
                { name: 'Last msg', value: `${user.lastMessage}`, inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
                { name: 'Last Channel Msg', value: `<#${user.lastMessageChannelID}>`, inline: true },
            )
            .setTimestamp()
            .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
        message.channel.send(newEmbed).catch((err) => {
            message.reply("`There was an error trying to execute this command!`");
            throw err;
        });
    }
}