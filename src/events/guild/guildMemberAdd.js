const profileModel = require("../../models/profileSchema");
const { antijoin } = require('../../Collection/index');

module.exports = async (Discord, client, member) => {
    const getCollection = antijoin.get(member.guild.id);
    if (!getCollection) return;
    if (!getCollection.includes(member.user)) {
        getCollection.push(member.user);
    }
    member.kick({ reason: "AntiJoin was enabled!" });

    let welcomeRole = member.guild.roles.cache.find(role => role.name === 'Member');
    member.roles.add(welcomeRole);

    const embed = new Discord.MessageEmbed()
        .setAuthor(`${member.displayName}`, member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`*Welcome **${member.displayName}**!*`)
        .setColor('#4e13df')
        .addFields(
            { name: '\u200B', value: `Make sure to read the <#821283571129647125>!` }
        )
        .setTimestamp()
    member.guild.channels.cache.get('819870581377597480').send(embed);

    let profile = await profileModel.create({
        userID: member.id,
        serverID: member.guild.id,
        bits: 1000,
        bank: 0,
    });
    profile.save();
}