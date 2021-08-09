const Discord = require('discord.js')

module.exports = {
    name: "embed",
    description: "make embed",
    permissions: ['MANAGE_MESSAGES'],
    async execute(message, args, cmd, client, Discord) {
        let title = args[0] // args[0] is the first word or number after the command name
        let color = args[1]
        let description = args.slice(2).join(" ") // args.slice(2).join(" ") means we're taking all the arguments including and after the second argument. An argument is just a word or number.
        const error = new Discord.MessageEmbed()
            .setColor('#4e13df')
            .setTitle('**❌ERROR INVALID ARGS**')
            .setDescription('`!embed <title> <COLOR> <message>`')

        if (!title) return message.channel.send(error) // ! means no, so if there's no title, return and send the error embed
        if (!color) return message.channel.send(error)
        if (!description) return message.channel.send(error)


        const embed = new Discord.MessageEmbed()
            .setTitle(`**${title}**`)
            .setColor(color)
            .setDescription(description)
        message.delete()

        message.channel.send(embed)
    }
}