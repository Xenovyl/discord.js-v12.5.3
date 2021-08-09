const { MessageEmbed, Message } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "giveaway",
    description: "Create a simple giveaway",
    usage: "<time> <channel> <prize>",
    permissions: ["ADMINISTRATOR"],
    async execute(message, args, cmd, client, Discord) {
        if (!args[0]) return message.reply('**You did not specify your time!**\r\n`!giveaway <time> <channel> <prize>`');
        if (
            !args[0].endsWith("d") &&
            !args[0].endsWith("h") &&
            !args[0].endsWith("m") &&
            !args[0].endsWith("s")
        )
            return message.reply('**You did not use the correct formatting for the time!**\r\n`!giveaway <time> <channel> <prize>`');
        if (isNaN(args[0][0])) return message.channel.send(`That is not a number!`);

        let channel = message.mentions.channels.first();
        if (!channel) return message.reply('**I could not find that channel in the guild!**\r\n`!giveaway <time> <channel> <prize>`');

        let prize = args.slice(2).join(" ");
        if (!prize) return message.reply('**No prize specified!**\r\n`!giveaway <time> <channel> <prize>`');

        message.channel.send(`*Giveaway created in ${channel}*`);
        let Embed = new MessageEmbed()
            .setTitle(`New giveaway!`)
            .addFields(
                { name: `\u200B`, value: `**Hosted by:** ${message.author}\r\n**Prize:** \`${prize}\`` },
            )
            .setTimestamp(Date.now() + ms(args[0]))
            .setFooter('Ends at')
            .setColor(`#4e13df`);
        let m = await channel.send(Embed);
        m.react("🎉");
        setTimeout(() => {
            if (m.reactions.cache.get("🎉").count <= 1) {
                message.channel.send(`Reactions: ${m.reactions.cache.get("🎉").count}`);
                return message.channel.send('`Not enough people reacted for me to start draw a winner!`');
            }

            const winnerEmbed = new MessageEmbed()
                .setColor('#4cc548')
                .setDescription(`**The winner of the giveaway for **${prize}** is...**`)

            let winner = m.reactions.cache
                .get("🎉")
                .users.cache.filter((u) => !u.bot)
                .random();
            channel.send(
                `The winner of the giveaway for **${prize}** is... ${winner}`
            );
        }, ms(args[0]));
    },
};