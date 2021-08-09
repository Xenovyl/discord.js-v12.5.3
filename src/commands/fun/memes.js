const randomPuppy = require('random-puppy');
const Discord = require('discord.js');

module.exports = {
    name: "meme",
    aliases: ['memes'],
    description: "meme command, sends a meme from certain place",

    async execute(message, args, cmd, client, Discord) {
        const subReddits = ["meme", "memes", "dankmemes", "comedyheaven"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]

        const img = await randomPuppy(random)

        const embed = new Discord.MessageEmbed()
            .setColor("#4e13df")
            .setImage(img)
            .setTitle(`**Your **meme** has been granted. All the way from** r/${random}`)
            .setURL(`https://reddit.com/r/${random}`)

        message.channel.send(embed).then((msg) => {
            setTimeout(() => message.delete());
        })
            .catch((err) => {
                throw err;
            })
    }
}