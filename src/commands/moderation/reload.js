module.exports = {
    name: 'reload',
    aliases: ['restart', 'rl'],
    description: 'Reloads a command',
    async execute(message, args, cmd, client, Discord) {
        if (message.author.id !== '307921446225838080') return message.channel.send('You are?');
        if (!args[0]) return message.reply('**You need to include the category of the command**\r\n`!reload <category> <command>`');
        if (!args[1]) return message.reply('**You need to include the name of the command!**');

        let dirs = args[0];
        let file = args[1].toLowerCase();
        try {
            delete require.cache[require.resolve(`../../commands/${dirs}/${file}.js`)]
            client.commands.delete(file);
            const pull = require(`../../commands/${dirs}/${file}.js`);
            client.commands.set(file, pull);

            return message.channel.send(`>>> **${file}** *was reloaded succesfully*!`);
        } catch (error) {
            return message.channel.send(`There was an error trying to reload **${file}**: \`${error.message}\``)
        }
    }
}