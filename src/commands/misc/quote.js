const { Canvas } = require('canvacord');

module.exports = {
    name: 'quote',
    aliases: ['quotes'],
    async execute(message, args, cmd, client, Discord) {
        let user = message.mentions.users.first();
        if (!user) return message.channel.send("`Please mention a user!`");
        let text = args.slice(1).join(" ");
        if (!text) return message.channel.send("`Please provide a text!`");
        let color = '#FFFFFF'
        const userAvatar = user.displayAvatarURL({ dynamic: true, format: "png" });
        const img = await Canvas.quote({ image: userAvatar, message: text, username: user.username, color: color });
        let attachment = new Discord.MessageAttachment(img, "quote.png");
        message.channel.send(attachment);
    },
};