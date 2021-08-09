module.exports = {
    name: 'simjoin',
    async execute(message, args, cmd, client, Discord) {
        if (message.author.id !== '307921446225838080') return message.reply("`You are not authorized in using this command!`")

        try {
            client.emit('guildMemberAdd', message.member)

        } catch (error) {
            console.log(error)
            message.channel.send('We occured into an error while executing this command!');
        }
    }
}