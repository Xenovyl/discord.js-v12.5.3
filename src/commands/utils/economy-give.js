const profileModel = require("../../models/profileSchema");

module.exports = {
    name: "give",
    permissions: ["ADMINISTRATOR"],
    description: "give a player some bits",
    async execute(message, args, cmd, client, Discord, profileData) {
        if (!args.length) return message.reply("`You need to mention a player to give them bits`");
        const amount = args[1];
        const target = message.mentions.users.first();
        if (!target) return message.reply("`That user does not exist`");

        if (amount % 1 != 0 || amount <= 0) return message.channel.send("Deposit amount must be a whole number");

        try {
            const targetData = await profileModel.findOne({ userID: target.id });
            if (!targetData) return message.reply("`This user doens't exist in the database`");

            await profileModel.findOneAndUpdate(
                {
                    userID: target.id,
                },
                {
                    $inc: {
                        bits: amount,
                    },
                }
            );
            const giveEmbed = new Discord.MessageEmbed()
                .setColor('#323232')
                .setDescription(`<@${message.author.id}>, this player has been given their bits! ₿${amount}`)
            return message.channel.send(giveEmbed);
        } catch (err) {
            console.log(err);
        }
    },
};