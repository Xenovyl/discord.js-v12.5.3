const fetch = require("node-fetch");

module.exports = {
    name: 'github',
    description: 'github search command',
    async execute(message, args, cmd, client, Discord) {
        const lolz = args.join('+')
        if (!lolz) return message.reply('Provide A Valid User To Search.');

        const url = `https://api.github.com/users/${lolz}`

        let json
        try {
            json = await fetch(url).then(res => res.json())
        }
        catch (e) {
            return message.reply('An Error Occured, Try Again Later.')
        }
        if (json.message) return message.reply("User Not Found.")

        const embed = new Discord.MessageEmbed()
            .setTitle("Github User Info For " + json.login)
            .setURL(`https://github.com/${args.join("+")}`)
            .addField("Username", json.login, true)
            .addField("Followers", json.followers, true)
            .addField("Following", json.following, true)
            .addField("Public Repositories", json.public_repos, true)
            .addField("Email", json.email ? json.email : "None", true)
            .setColor("#4169e1")
            .addField("Created At", json.created_at, true)
            .addField("Bio:", json.bio ? json.bio : "None")
            .setThumbnail(json.avatar_url)

        message.channel.send(embed);
    },
};