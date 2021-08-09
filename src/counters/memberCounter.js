module.exports = async (client) => {
    const guild = client.guilds.cache.get('808991692363399168');
    setInterval(() => {
        const memberCount = guild.memberCount;
        const channelTotalMembers = guild.channels.cache.get('831057234178998311');
        const channelMembers = guild.channels.cache.get('831057262935408670');
        const channelBots = guild.channels.cache.get('831057290093133856');
        channelTotalMembers.setName(`Total Members: ${memberCount.toLocaleString()}`);
        channelMembers.setName(`Members: ${guild.members.cache.filter(m => !m.user.bot).size}`);
        channelBots.setName(`Bots: ${guild.members.cache.filter(m => m.user.bot).size}`);
    }, 5000);
}