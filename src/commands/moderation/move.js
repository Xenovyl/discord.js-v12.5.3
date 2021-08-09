module.exports = {
    name: 'move',
    description: 'this command pulls members into your voice channel!',
    permissions: ["MANAGE_CHANNELS"],
    async execute(message, args, cmd, client, Discord) {
        const member = message.mentions.members.first();
        if (!member) return message.reply("Please mention a user!");
        if (!member.voice.channel) return message.reply("The member you mentioned is not in a voice channel!");

        if (!message.member.voice.channel) return message.reply("Please join a voice channel!");
        member.voice.setChannel(message.member.voice.channel);

        const embed = new Discord.MessageEmbed()
            .setColor('#4e13df')
            .setDescription(`${message.author} has moved ${member} into his channel!`)

        message.channel.send(embed);
    },
};