const { MessageEmbed } = require('discord.js');

module.exports = async (client, Discord, member) => {
    const embed = new MessageEmbed()
        .setColor('RED')
        .setTitle(`MEMBER LEFT`)
        .addFields(
            { name: 'Member', value: `${member.displayName}` },
            { name: "Member's ID", value: `${member.id}` }
        )
    member.guild.channels.cache.get('832167338668195850').send(embed);
}