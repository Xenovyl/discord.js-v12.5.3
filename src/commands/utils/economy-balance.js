module.exports = {
    name: "balance",
    aliases: ["bal", "bl", 'conto', 'bank', 'banca'],
    description: "Check the user balance",
    async execute(message, args, cmd, client, Discord, profileData) {
        const user = message.mentions.users.first() || message.author;
        const balanceEmbed = new Discord.MessageEmbed()
            .setColor('#323232')
            .setAuthor(`${user.username}'s Balance`, user.displayAvatarURL({ dynamic: true }))
            .setDescription(`Wallet: ₿**${profileData.bits}**\r\n Bank: ₿**${profileData.bank}**`)
        message.channel.send(balanceEmbed).catch((err) => {
            throw err;
        });
    },
};