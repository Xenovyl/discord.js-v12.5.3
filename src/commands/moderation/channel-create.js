module.exports = {
    name: 'channel-create',
    aliases: ['create-channel', 'createchannel', 'channelcreate'],
    permissions: ['MANAGE_CHANNELS'],
    async execute(message, args, cmd, client, Discord) {
        const channelName = args.join(" ");
        if (!channelName) return message.lineReply('`Please specify a channel name.`');

        message.guild.channels.create(channelName).then((ch) => {
            message.channel.send(`**Click ${ch} to access the newly created channel!**`);
        });
    },
};