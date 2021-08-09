module.exports = (Discord, client, server) => {
    server.owner.send(
        new Discord.MessageEmbed()
            .setColor("#4e13df")
            .setDescription(`Thanks for inviting me to your server!\r\nType \`${process.env.PREFIX}help\` to get all useful commands.`)
            .setFooter("Made by Lorеnzo#1000")
    );
};