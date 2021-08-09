module.exports = {
    name: '8ball',
    description: '8ball command',
    execute(message, args, cmd, client, Discord) {
        let messageArgs = args.join(' ')
        if (!messageArgs) return message.reply('**Please provide a question**\r\n`!8ball <question>`')

        const answers = ['Yes', 'No', 'Maybe', 'Ask Later', 'No time to tell now', 'Not Know']
        const response = answers[Math.floor(Math.random() * answers.length)]

        message.channel.send(response).catch((err) => {
            message.reply("`There was an error trying to execute this command!`");
            throw err;
        });
    }
}