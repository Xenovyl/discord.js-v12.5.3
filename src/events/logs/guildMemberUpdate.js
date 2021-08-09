module.exports = (Discord, client, oldMember, newMember) => {
    let log = client.channels.cache.get('832167338668195850');

    let options = {}

    if (options[newMember.guild.id]) {
        options = options[newMember.guild.id]
    }

    if (typeof options.excludedroles === "undefined") options.excludedroles = new Array([])
    if (typeof options.trackroles === "undefined") options.trackroles = true
    const oldMemberRoles = oldMember.roles.cache.keyArray()
    const newMemberRoles = newMember.roles.cache.keyArray()
    const oldRoles = oldMemberRoles.filter(x => !options.excludedroles.includes(x)).filter(x => !newMemberRoles.includes(x))
    const newRoles = newMemberRoles.filter(x => !options.excludedroles.includes(x)).filter(x => !oldMemberRoles.includes(x))
    const rolechanged = (newRoles.length || oldRoles.length)

    if (rolechanged) {
        let roleadded = ""
        if (newRoles.length > 0) {
            for (let i = 0; i < newRoles.length; i++) {
                if (i > 0) roleadded += ", "
                roleadded += `<@&${newRoles[i]}>`
            }
        }
        let roleremoved = ""
        if (oldRoles.length > 0) {
            for (let i = 0; i < oldRoles.length; i++) {
                if (i > 0) roleremoved += ", "
                roleremoved += `<@&${oldRoles[i]}>`
            }
        }
        let text = `${roleremoved ? `❌ **ROLE REMOVED**: \n${roleremoved}` : ""}${roleadded ? `✅ **ROLE ADDED**:\n${roleadded}` : ""}`

        const embed = new Discord.MessageEmbed()
            .setColor(`${roleadded ? "GREEN" : "RED"}`)
            .setTitle("Member ROLES Changed")
            .setDescription(`**User**: ${newMember.user}\n**Tag**: \`${oldMember.user.tag}\`\n\n${text}`)
        log.send(embed);
    }
};