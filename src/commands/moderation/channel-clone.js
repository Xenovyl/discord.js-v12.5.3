module.exports = {
    name: 'clone',
    description: 'clones the channel!',
    aliases: ['nuke', 'clonechannel', 'clone-channel', 'channel-clone'],
    permissions: ['MANAGE_CHANNELS'],
    async execute(message, args, cmd, client, Discord) {
        message.channel.clone().then((ch) => {
            ch.setParent(message.channel.parent.id);
            ch.setPosition(message.channel.position);
            message.channel.delete();

            const clonedChannel = new Discord.MessageEmbed()
                .setColor("#4e13df")
                .setDescription(`**This channel has been cloned!**`)
            ch.send(clonedChannel);
        })
    },
};