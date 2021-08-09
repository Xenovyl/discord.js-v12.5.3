module.exports = {
    name: 'add-role',
    aliases: ['give-role', 'addrole', 'role-add'],
    permissions: ['MANAGE_ROLES'],
    description: "this command adds a role to a user ",
    async execute(message, args, cmd, client, Discord) {
        message.delete();

        if (!args[0] || !args[1]) return message.reply("**Incorrect usage**\r\n`!addrole <@user> <@permission>`")

        try {

            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            const roleName = message.guild.roles.cache.find(r => (r.name === args[1].toString()) || (r.id === args[1].toString().replace(/[^\w\s]/gi, '')));

            const alreadyHasRole = member._roles.includes(roleName.id);

            if (alreadyHasRole) return message.channel.send('User already has that role').then(m => m.delete({ timeout: 5000 }));

            const embed = new Discord.MessageEmbed()
                .setTitle(`Role Name: ${roleName.name}`)
                .setDescription(`${message.author} has successfully given the role ${roleName} to ${member.user}`)
                .setColor('#4cc548')
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

            return member.roles.add(roleName).then(() => message.channel.send(embed));
        } catch (e) {
            return message.channel.send('Try to give a role that exists next time...').then(m => m.delete({ timeout: 5000 })).then(() => console.log(e))
        }
    },
};