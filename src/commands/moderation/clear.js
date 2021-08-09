module.exports = {
    name: 'clear',
    description: { usage: "!clear <amount>", content: "Clear messages!", },
    permissions: ["MANAGE_MESSAGES"],
    aliases: ['c'],
    async execute(message, args, cmd, client, Discord) {
        if (!args[0]) return message.reply(`\`Please enter the amount of messages you want to clear!\``).then((msg) => {
            message.delete();
            msg.delete({ timeout: 10000 });
        });

        if (isNaN(args[0])) return message.reply(`\`Please enter a real number!\``).then((msg) => {
            message.delete();
            msg.delete({ timeout: 10000 });
        });

        if (args[0] > 100) return message.reply(`\`You can't delete more than 100 messages!\``).then((msg) => {
            message.delete();
            msg.delete({ timeout: 10000 });
        });

        if (args[0] < 1) return message.reply(`\`You must delete at least one message!\``).then((msg) => {
            message.delete();
            msg.delete({ timeout: 10000 });
        });

        await message.channel.messages.fetch({ limit: args[0] }).then(messages => { message.channel.bulkDelete(messages) });
    },
};