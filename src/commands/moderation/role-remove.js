module.exports = {
    name: 'remove-role',
    aliases: ['removerole', 'role-remove'],
    permissions: ['MANAGE_ROLES'],
    description: "this command removes a role to a user ",
    async execute(message, args, cmd, client, Discord) {
        message.delete();

        if (!args[0] || !args[1]) return message.reply("**Incorrect usage**\r\n`!removerole <@user> <@permission>`")

        try {

            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            const roleName = message.guild.roles.cache.find(r => (r.name === args[1].toString()) || (r.id === args[1].toString().replace(/[^\w\s]/gi, '')));


            const embed = new Discord.MessageEmbed()
                .setTitle(`Role Name: ${roleName.name}`)
                .setDescription(`${message.author} has removed the role ${roleName} to ${member.user}`)
                .setColor('RED')
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

            return member.roles.remove(roleName).then(() => message.channel.send(embed));
        } catch (e) {
            return message.channel.send('Try to give a role that exists next time...').then(m => m.delete({ timeout: 5000 })).then(() => console.log(e))
        }
    },
};