const axios = require('axios');

module.exports = {
    name: "instagram",
    description: "find a user that u searched",
    aliases: ["ig", "insta"],
    async execute(message, args, cmd, client, Discord) {
        const verified = '<:verified:847137106769477642>';

        if (!args[0]) {
            return message.channel.send(`\`Please enter a profile name\``).then((msg) => {
                message.delete();
                msg.delete({ timeout: 5000 });
            });
        }
        let url, response, account, details;
        try {
            url = `https://instagram.com/${args[0]}/?__a=1`;
            response = await axios.get(url)
            account = response.data
            details = account.graphql.user
        } catch (error) {
            return message.channel.send(`\`Can't find that user\``).then((msg) => {
                message.delete();
                msg.delete({ timeout: 5000 });
            });
        }



        const embed = new Discord.MessageEmbed()
            .setColor("#ff1298")
            .setTitle(`${details.is_verified ? `${details.username} ${verified}` : ` ${details.username}`} ${details.is_private ? '🔒' : ''} `)
            .setDescription(details.biography)
            .setThumbnail(details.profile_pic_url)
            .addFields(
                {
                    name: "Total Posts:",
                    value: details.edge_owner_to_timeline_media.count.toLocaleString(),
                    inline: true
                },
                {
                    name: "Followers:",
                    value: details.edge_followed_by.count.toLocaleString(),
                    inline: true
                },
                {
                    name: "Following:",
                    value: details.edge_follow.count.toLocaleString(),
                    inline: true
                }
            )
        await message.channel.send(embed).then(message.delete());
    },
};