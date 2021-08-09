module.exports = (Discord, client, oldUser, newUser) => {
    let log = client.channels.cache.get('832167338668195850');

    const embed = new Discord.MessageEmbed()
        .setColor('#303331')
        .setTitle("Member Username Changed")
        .setDescription(`**User**: ${newUser}\n**Old Username**: \`${oldUser.username}\`\n**New Username**: \`${newUser.username}\``)
    log.send(embed);
};