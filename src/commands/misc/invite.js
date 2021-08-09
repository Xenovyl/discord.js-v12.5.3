module.exports = {
    name: 'invite',
    cooldown: 10,
    description: "sends discord invite!",
    execute(message, args, cmd, client, Discord) {
        message.channel.send('\n\n>>> link has to be insert \n\n').catch((err) => {
            message.reply("`There was an error trying to execute this command!`");
            throw err;
        });
    }
}