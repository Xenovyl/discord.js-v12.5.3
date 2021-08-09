module.exports = {
    name: "servericon",
    aliases: ["guildavatar", 'guild-avatar', 'server-icon'],
    category: "info",
    description: "Get avatar of the server",
    async execute(message, args, cmd, client, Discord) {
        const embed = new Discord.MessageEmbed()
            .setColor("#4e13df")
            .setImage(message.guild.iconURL({ dynamic: true, size: 512 }))
        message.channel.send(embed).then(message.delete());
    },
};