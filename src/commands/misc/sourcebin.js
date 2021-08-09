const { create } = require('sourcebin');

module.exports = {
    name: 'sourcebin',
    description: "this command automatically posts your content on a sourcebin link!",
    aliases: ['bin', 'src', 'srcbin'],
    async execute(message, args, cmd, client, Discord) {
        const content = args.join(" ");
        if (!content) return message.reply('`Please give contents`');

        create(
            [
                {
                    name: 'random code',
                    content,
                    language: 'javascript',
                }
            ],
            {
                title: 'Title',
                description: "Description",
            }
        ).then((value) => {
            message.channel.send(`${message.author}, **Your code has been posted** **->** ${value.url}`).then((msg) => {
                setTimeout(() => message.delete());
            })
        })
    },
};