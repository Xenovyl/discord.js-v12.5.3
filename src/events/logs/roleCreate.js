module.exports = (Discord, client, role) => {
    let log = client.channels.cache.get('832167338668195850');

    const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle("ROLE CREATED")
        .setDescription(`**ROLE**:\r\n${role}\n**Name**: ${role.name}\n**ID**: ${role.id}\n**HEX COLOR**: ${role.hexColor}\n**Position**: ${role.position}`)
    log.send(embed);
};