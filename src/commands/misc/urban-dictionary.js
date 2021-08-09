const urban = require('relevant-urban');

module.exports = {
    name: 'urban',
    description: 'Defines a word, but with urban Dictionary.',
    aliases: ['ud'],
    async execute(message, args, cmd, client, Discord) {
        if (!args[0]) return message.reply("`Please specify a query`");

        let result = await urban(args[0]).catch(e => {
            return message.reply(`**Unknown word phrase of** \`${args[0]}\`, **please try again.**`);
        });

        const embed = new Discord.MessageEmbed()
            .setColor("#4e13df")
            .setTitle("[WEBSITE]")
            .setURL(`${result.urbanURL}`)
            .setDescription(`**Definition:** \n**${result.definition}** \n\n**Example:** \n**${result.example}**`)
            .addField("Author", result.author, true)
            .addField("Rating", `👍 ${result.thumbsUp.toLocaleString()} | 👎 ${result.thumbsDown.toLocaleString()}`)

        if (result.tags.lenght > 0 && result.tags.join(" ").lenght < 1024) {
            embed.addField("Tags", result.tags.join(", "), true);
        }
        return message.channel.send(embed);
    }
}