const profileModel = require("../../models/profileSchema");

module.exports = {
    name: "deposit",
    aliases: ["dep", 'deposita'],
    description: "Deposit bits into your bank!",
    async execute(message, args, cmd, client, Discord, profileData) {
        const amount = args[0];
        if (amount % 1 != 0 || amount <= 0) return message.reply("`Deposit amount must be a whole number`");
        try {
            if (amount > profileData.bits) return message.reply("`You don't have that amount of bits to deposit`");
            await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id,
                },
                {
                    $inc: {
                        bits: -amount,
                        bank: amount,
                    },
                }
            );
            const depositEmbed = new Discord.MessageEmbed()
                .setColor('#323232')
                .setDescription(`<@${message.author.id}>, you deposited ₿**${amount}** into your bank!`)
            return message.channel.send(depositEmbed);
        } catch (err) {
            console.log(err);
        }
    },
};