module.exports = {
    name: 'banlist',
    aliases: ['ban-list', 'bannedmembers', 'fetchbans'],
    description: "shows the entire ban list of the server!",
    permissions: ["BAN_MEMBERS"],
    async execute(message, args, cmd, client, Discord) {
        const fetchBans = message.guild.fetchBans();

        const bannedMembers = (await fetchBans)
            .map((member) => `\`${member.user.tag}\` \`(**ID**: ${member.user.id})\``)
            .join("\n")

        message.channel.send(bannedMembers)
    }
}