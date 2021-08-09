module.exports = {
    name: 'unmute',
    description: "This command UNMUTES a member!",
    execute(message, args, cmd, client, Discord) {
        if (message.member.permissions.has("MANAGE_ROLES")) {
            const target = message.mentions.users.first();
            if (target) {
                let mainRole = message.guild.roles.cache.find(role => role.name === 'Member')
                let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')

                let memberTarget = message.guild.members.cache.get(target.id);

                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);
                message.channel.send(`<@${memberTarget.user.id}> **has been UNMUTED**`);
            } else {
                message.reply('**Please mention someone before sending the command!**\r\n`!unmute <@user>`');
            }

        } else {
            message.reply('`You do not have the right permissions to use this command.`');
        }
    }
}