const ms = require('ms');

module.exports = {
    name: 'uptime',
    description: "this command shows bot's uptime!",
    async execute(message, args, cmd, client, Discord) {
        const embed = new Discord.MessageEmbed()
        .setColor('#4e13df')
        .setDescription(`⏰ My uptime is \`${ms(client.uptime, { long: true })}\``)
        message.channel.send(embed);
    },
};