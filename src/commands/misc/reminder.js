const ms = require('ms')

module.exports = {
    name: "remind",
    aliases: ['remember'],
    description: {
        usage: "!remind <time> <reminder>",
        content: "Helps remind you something",
    },
    async execute(message, args, cmd, client, Discord) {
        let time = args[0];
        let user = message.author
        let reminder = args.splice(1).join(' ')

        const notime = new Discord.MessageEmbed()
            .setColor('#4e13df')
            .setDescription("**Please specify the time!**\r\n`!remind <time> <message>`")

        const wrongtime = new Discord.MessageEmbed()
            .setColor('#4e13df')
            .setDescription("`Sorry I only do d, m, h, or s.`")

        const reminderembed = new Discord.MessageEmbed()
            .setColor('#4e13df')
            .setDescription("`Please tell me what you want to be reminded off`")

        if (!args[0]) return message.channel.send(notime)
        if (
            !args[0].endsWith("d") &&
            !args[0].endsWith("m") &&
            !args[0].endsWith("h") &&
            !args[0].endsWith("s")
        )


            return message.channel.send(wrongtime)
        if (!reminder) return message.channel.send(reminderembed)

        const remindertime = new Discord.MessageEmbed()
            .setColor('#4e13df')
            .setDescription(`\**Your reminder will go off in ${time}**`)

        message.channel.send(remindertime).then((msg) => {
            setTimeout(() => message.delete());
        });

        const reminderdm = new Discord.MessageEmbed()
            .setColor('#4cc548')
            .setTitle('**REMINDER**')
            .setDescription(`**It has been ${time} here is your reminder:** ${reminder}`)

        setTimeout(async function () {
            try {

                await user.send(reminderdm)
            } catch (err) {

            }

        }, ms(time));
    }
}