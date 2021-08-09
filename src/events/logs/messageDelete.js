module.exports = async (Discord, client, message) => {
    if (!message.author || message.author.bot) return;

    const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Message Deleted")
        .addFields(
            { name: 'Author:', value: `${message.author.toString()} (${message.author.id})` },
            { name: 'Channel:', value: `${message.channel}` },
            { name: 'Message:', value: `${message.content}` }
        )
    const DeleteChannel = message.guild.channels.cache.get("832167338668195850")
    DeleteChannel.send(embed);

    if (message.mentions.users.first()) {
        if (message.mentions.users.first().bot) return;
        const ghostPingEMBED = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("GHOST PING")
            .addFields(
                { name: 'Author:', value: `${message.author.toString()} (${message.author.id})` },
                { name: 'Channel:', value: `${message.channel}` },
                { name: 'Ping:', value: `${message.mentions.users.first()}` }
            )
        return DeleteChannel.send(ghostPingEMBED);
    }
};