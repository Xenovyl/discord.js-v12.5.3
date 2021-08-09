module.exports = {
    name: 'channel-delete',
    description: "deletes a channel",
    aliases: ['channeldelete', 'deletechannel', 'delete-channel'],
    permissions: ['MANAGE_CHANNELS'],
    async execute(message, args, cmd, client, Discord) {
        const channelTarget = message.mentions.channels.first() || message.channel;

        channelTarget.delete().then((ch) => {
            message.channel.send(`\`Channel has been deleted.\``);
        });
    },
};