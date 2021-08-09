module.exports = {
    name: "say",
    permissions: ["ADMINISTRATOR"],
    execute(message, args, cmd, client, Discord) {
        const sayEmbed = new Discord.MessageEmbed()
            .setDescription(args.join(" "))
            .setColor("#323232")

        message.channel.send(sayEmbed).then((msg) => {
            setTimeout(() => message.delete());
        })
            .catch((err) => {
                throw err;
            })
    },
};