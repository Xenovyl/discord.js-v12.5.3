module.exports = {
    name: 'achievement',
    aliases: ['mc-achievement'],
    async execute(message, args, cmd, client, Discord) {
        const sentence = args.join("+")
        if (!sentence) return message.reply('`Please specify a text.`')
        if (sentence > 22) return message.reply("`Please type a text no bigger than 22 characters`")
        const embed = new Discord.MessageEmbed()
            .setImage(`https://api.cool-img-api.ml/achievement?text=${sentence}`)
            .setColor('#4e13df')
        message.channel.send(embed)
    }
}