const { antijoin } = require('../../Collection');

module.exports = {
    name: 'anti-join',
    aliases: ['antijoin'],
    permissions: ['ADMINISTRATOR'],
    async execute(message, args, cmd, client, Discord) {
        const query = args[0]?.toLowerCase();
        if (!query) return message.reply("**Please specify a query**:\r\n`!anti-join [on/off]`");

        const getCollection = antijoin.get(message.guild.id);
        if (query === 'on') {
            const AlreadyEnabled = new Discord.MessageEmbed()
                .setColor("#4e13df")
                .setDescription("Anti-Join is already ENABLED!")
            if (getCollection) return message.reply(AlreadyEnabled);
            antijoin.set(message.guild.id, []);
            const TurnedON = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription("Anti-Join has been turned ON!")
            message.reply(TurnedON);
        } else if (query === 'off') {
            const AlreadyDisabled = new Discord.MessageEmbed()
                .setColor("#4e13df")
                .setDescription("Anti-Join is already DISABLED!")
            if (!getCollection) return message.reply(AlreadyDisabled);
            antijoin.delete(message.guild.id);
            const TurnedOFF = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("Anti-Join has been turned OFF!")
            message.reply(TurnedOFF);
        } else if (query === 'list') {
            const Disabled = new Discord.MessageEmbed()
                .setColor("#4e13df")
                .setDescription("Anti-Join is DISABLED!")
            if (!getCollection) return message.reply(Disabled);
            const KickedMembers = new Discord.MessageEmbed()
                .setColor("#4e13df")
                .setDescription(`__Kicked Members:__ \n\n \`${getCollection.map((value) => { return `${value.tag} (${value.id})` })}\``)
            message.reply(KickedMembers);
        }
    },
};