const util = require('minecraft-server-util');

module.exports = {
    name: 'mcserver',
    aliases: ['mcservers', 'minecraftserver', 'minecraftservers'],
    description: {
        usage: "<prefix><command> <serverIP> <25565>",
        content: "get information about a minecraft server",
    },
    execute(message, args, cmd, client, Discord) {
        if (!args[0]) return message.reply("**Please enter a Minecraft server ip**\r\n`!mcserver <serverIP> 25565`");
        if (!args[1]) return message.reply("`Please enter the Minecraft server port (25565)`");

        util.status(args[0], { port: parseInt(args[1]) }).then((response) => {
            const embed = new Discord.MessageEmbed()
                .setColor('#4e13df')
                .setTitle('𝐌𝐈𝐍𝐄𝐂𝐑𝐀𝐅𝐓 𝐒𝐄𝐑𝐕𝐄𝐑 𝐒𝐓𝐀𝐓𝐔𝐒')
                .addFields(
                    { name: 'Server IP', value: response.host },
                    { name: 'Online Players', value: response.onlinePlayers },
                    { name: 'Max Players', value: response.maxPlayers },
                    { name: 'Version', value: response.version }
                )

            message.channel.send(embed).then((msg) => {
                setTimeout(() => message.delete());
            });
        }).catch((error) => {
            message.reply("`There was an error trying to execute this command!`");
            throw error;
        });
    },
};