const { afk } = require('../../Collection');

module.exports = {
    name: 'afk',
    async execute(message, args, cmd, client, Discord) {
        const reason = args.join(" ") || "No Reason";

        afk.set(message.author.id, [Date.now(), reason]);

        const embed = new Discord.MessageEmbed()
            .setColor("#4e13df")
            .setDescription(`${message.author}, you are now AFK\r\nReason: \`${reason}\``)

        message.channel.send(embed).then(message.delete());
    },
};