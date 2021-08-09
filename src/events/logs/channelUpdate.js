module.exports = (Discord, client, oldChannel, newChannel) => {
    let log = client.channels.cache.get('832167338668195850');

    let newCat = newChannel.parent ? newChannel.parent.name : "NO PARENT";
    let guildChannel = newChannel.guild;
    if (!guildChannel || !guildChannel.available) return;

    let types = {
        text: "Text Channel",
        voice: "Voice Channel",
        null: "No Type",
        news: "Announcement Channel",
        store: "Store Channel",
        category: "Category",
    }

    if (oldChannel.name != newChannel.name) {
        const NAMEembed = new Discord.MessageEmbed()
            .setColor('#303331')
            .setTitle("Channel UPDATED - NAME")
            .setDescription(`__ ** OLD ** __\r\n\r\n ** Name:** \`${oldChannel.name}\`\n**ID:** \`${oldChannel.id}\`\n\n` + `__**NEW**__\r\n\r\n **Name:** \`${newChannel.name}\`\n**ID:** \`${newChannel.id}\``)
        log.send(NAMEembed);
    } else if (oldChannel.type != newChannel.type) {
        const TYPEembed = new Discord.MessageEmbed()
            .setColor('#303331')
            .setTitle("Channel UPDATED - TYPE")
            .setDescription(`__**OLD**__\r\n\r\n **Name:** \`${oldChannel.name}\`\n**ID:** \`${oldChannel.id}\`\n**Type:** \`${types[oldChannel.type]}\`\n\n` +
                `__**NEW**__\r\n\r\n **Name:** \`${newChannel.name}\`\n**ID:** \`${newChannel.id}\`\n**Type:** \`${types[newChannel.type]}\``)
        log.send(TYPEembed);
    } else if (oldChannel.topic != newChannel.topic) {
        const TOPICembed = new Discord.MessageEmbed()
            .setColor('#303331')
            .setTitle("Channel UPDATED - TOPIC")
            .setDescription(`__**OLD**__\r\n\r\n **Name:** \`${oldChannel.name}\`\n**ID:** \`${oldChannel.id}\`\n**Topic:** \`${oldChannel.topic}\`\n\n` +
                `__**NEW**__\r\n\r\n **Name:** \`${newChannel.name}\`\n**ID:** \`${newChannel.id}\`\n**Topic:** \`${newChannel.topic}\``)
        log.send(TOPICembed);
    }
};