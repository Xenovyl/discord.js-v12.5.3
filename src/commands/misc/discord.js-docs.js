const fetch = require('node-fetch')

module.exports = {
    name: "docs",
    description: "Search the d.js docs for something!",
    aliases: ['discordjs-docs', 'djs-docs', 'djsdocs'],
    async execute(message, args, cmd, client, Discord) {
        const query = args.join(" ")
        if (!query) return message.reply("`Please specify something to search for!`")
        fetch(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(query)}`).then(res => res.json()).then(data => {
            message.channel.send({ embed: data })
        })
    },
};