const schema = require('../../models/blacklist-servers');

module.exports = {
    name: 'blacklist-remove',
    async execute(message, args, cmd, client, Discord) {
        if (message.author.id !== '307921446225838080') return;

        const id = args[0];
        if (!id) return message.reply("Please specify a guild id").then((msg) => {
            message.delete();
            msg.delete({ timeout: 5000 });
        });

        schema.findOne({
            Server: id
        }, async (err, data) => {
            if (!data) return message.reply("`That guild id doesn't exist in the database`").then((msg) => {
                message.delete();
                msg.delete({ timeout: 5000 });
            });

            data.delete();
            message.reply("Guild was unblacklisted successfully");
        });
    },
};