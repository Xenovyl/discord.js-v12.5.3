const { tictactoe } = require('reconlx')

module.exports = {
    name: "tictactoe",
    aliases: ['tris'],
    description: "tic tac toe command",

    async execute(message, args, cmd, client, Discord) {
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('**Please specify a user to play against!**\r\n`!tictactoe <@user>`')

        new tictactoe({
            player_two: member,
            message: message
        })
    }
}