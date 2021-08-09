module.exports = {
    name: "howgay",
    description: "a howgay command",
    async execute(message, args, cmd, client, Discord) {
        let member = message.mentions.users.first() || message.author

        let rng = Math.floor(Math.random() * 101);

        const howgayembed = new Discord.MessageEmbed()
            .setTitle(`Gay Machine Calculator`)
            .setDescription(`${member.username} is ` + rng + "% Gay 🌈")
            .setColor("#4e13df")

        message.channel.send(howgayembed).then((msg) => {
            setTimeout(() => message.delete());
        })
            .catch((err) => {
                throw err;
            })
    }
}