module.exports = {
    name: 'avatar',
    cooldown: 5,
    aliases: ['icon', 'pic', 'profilepic'],
    description: 'Return a user(s) avatar picture!',
    async execute(message, args, cmd, client, Discord) {
        const user = message.mentions.users.first() || message.author;
        const avatarEmbed = new Discord.MessageEmbed()
            .setColor('#4e13df')
            .setDescription(`**${user.username}'s Avatar: **`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
        message.channel.send(avatarEmbed).catch((err) => {
            throw err;
        });
    },
};