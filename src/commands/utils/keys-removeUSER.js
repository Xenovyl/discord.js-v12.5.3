const db = require('../../models/keys-users');

module.exports = {
    name: 'keys-remove',
    description: 'Remove a user key!',
    aliases: ['key-remove', 'keyremove', 'keysremove'],
    async execute(message, args, cmd, client, Discord) {
        if (!message.author.id === '307921446225838080') return message.reply(`\`You can't execute this command\``).then((msg) => {
            message.delete();
            msg.delete({ timeout: 5000 });
        });

        const user = message.mentions.users.first();
        if (!user) return message.lineReply(`\`Please provide the user!\``).then((msg) => {
            message.delete();
            msg.delete({ timeout: 5000 });
        });

        db.findOne({ user: user.id }, async (err, data) => {
            if (!data) return message.lineReply(`\`That user does not have a key yet!\``).then((msg) => {
                message.delete();
                msg.delete({ timeout: 5000 });
            });

            await db.findOneAndDelete({ user: user.id });
            message.reply(`${user}**'s key has been removed**`).then((msg) => {
                message.delete();
                msg.delete({ timeout: 5000 });
            });
        });
    },
};