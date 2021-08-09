module.exports = {
    name: 'wikipedia',
    async execute(message, args, cmd, client, Discord) {
        if (!args[0]) return message.reply("`Please enter the something to search!`");

        var query = args.join(" ");
        query = query.replace(/ /g, "_");

        let link = `https://it.wikipedia.org/wiki/${query}`
        message.channel.send(link)
    },
};