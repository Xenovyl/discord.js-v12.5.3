const ms = require('ms');

module.exports = {
    name: 'mute',
    description: "This command MUTES a member!",
    execute(message, args, cmd, client, Discord) {
        if (message.member.permissions.has("MANAGE_ROLES")) {
            const target = message.mentions.users.first();
            if (target) {
                let mainRole = message.guild.roles.cache.find(role => role.name === 'Member')
                let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')

                let memberTarget = message.guild.members.cache.get(target.id);

                if (!args[1]) {
                    memberTarget.roles.remove(mainRole.id);
                    memberTarget.roles.add(muteRole.id);
                    message.channel.send(`<@${memberTarget.user.id}> **has been MUTED**`);
                    return
                }
                memberTarget.roles.remove(mainRole.id);
                memberTarget.roles.add(muteRole.id);
                message.channel.send(`<@${memberTarget.user.id}> **has been MUTED for ${ms(ms(args[1]))}**`);

                setTimeout(function () {
                    memberTarget.roles.remove(muteRole.id);
                    memberTarget.roles.add(mainRole.id);
                }, ms(args[1]));
            } else {
                message.reply('**Please mention someone before sending the command!**\r\n`!mute <@user> <time>`');
            }

        } else {
            message.reply('`You do not have the right permissions to use this command.`');
        }
    }
}