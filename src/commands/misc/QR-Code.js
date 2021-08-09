module.exports = {
    name: "qr",
    aliases: ["qrcode"],
    permissions: ['ADMINISTRATOR'],
    async execute(message, args, cmd, client, Discord) {

        let link = (args[0])
        let qrlink = `http://api.qrserver.com/v1/create-qr-code/?data=${link}&size=200x200`

        if (!link)
            return message.reply(`\`Please provide a link!\``)

        if (require('is-url')(link)) {
            const attachment = new Discord.MessageAttachment(qrlink, 'qrcode.png');

            const embed = new Discord.MessageEmbed()
                .attachFiles(attachment)
                .setColor("#4e13df")
                .setImage('attachment://qrcode.png')
                .setFooter(`Made By ${message.author.tag}`)

            message.channel.send(embed).then((msg) => {
                setTimeout(() => message.delete());
            })

        } else {
            message.channel.send(`**Error provide a valid link which contains** \`https://\``)
        }

    }
}