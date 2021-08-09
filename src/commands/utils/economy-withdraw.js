const profileModel = require("../../models/profileSchema");

module.exports = {
    name: "withdraw",
    aliases: ["wd", 'ritira'],
    description: "withdraw bits from your bank",
    async execute(message, args, cmd, client, Discord, profileData) {
        const amount = args[0];
        if (amount % 1 != 0 || amount <= 0) return message.reply("`Withdrawn amount must be a whole number`");

        try {
            if (amount > profileData.bank) return message.reply("`You don't have that amount of bits to withdraw`");

            await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id,
                },
                {
                    $inc: {
                        bits: amount,
                        bank: -amount,
                    },
                }
            );
            const withdrawEmbed = new Discord.MessageEmbed()
                .setColor('#323232')
                .setDescription(`<@${message.author.id}>, you withdrew ₿**${amount}** into your wallet!`)
            return message.channel.send(withdrawEmbed);
        } catch (err) {
            console.log(err);
        }
    },
};