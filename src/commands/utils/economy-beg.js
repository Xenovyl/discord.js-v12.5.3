const profileModel = require("../../models/profileSchema");

module.exports = {
    name: "beg",
    aliases: ['elemosina'],
    description: "beg for bits",
    async execute(message, args, cmd, client, Discord, profileData) {
        const randomNumber = Math.floor(Math.random() * 500) + 1;
        const response = await profileModel.findOneAndUpdate(
            {
                userID: message.author.id,
            },
            {
                $inc: {
                    bits: randomNumber,
                },
            }
        );
        const begEmbed = new Discord.MessageEmbed()
            .setColor('#323232')
            .setDescription(`<@${message.author.id}>, you begged and received ₿**${randomNumber}**`)
        return message.channel.send(begEmbed).catch((err) => {
            throw err;
        });
    },
};