let isgd = require('isgd');

module.exports = {
    name: 'url',
    aliases: ['url-shorter'],
    description: 'Shorten a url',
    async execute(message, args, cmd, client, Discord) {
        if (!args[0]) return message.reply(`\`Please provide a link\``);

        if (!args[1]) {
            isgd.shorten(args[0], function (res) {
                if (res.startsWith('Error:')) return message.channel.send(`Please enter a valid url`);

                message.channel.send(`Here is the url:\n${res}`);
            });

        } else {
            isgd.custom(args[0], args[1], function (res) {
                if (res.startsWith(`Error:`)) return message.channel.send(` An error has occured: ${res}`);

                message.channel.send(`Here is the url:\n${res}`);
            });
        }
    },
};