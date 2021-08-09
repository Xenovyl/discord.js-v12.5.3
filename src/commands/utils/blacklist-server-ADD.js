const schema = require('../../models/blacklist-servers');

module.exports = {
    name: 'blacklist-add',
    async execute(message, args, cmd, client, Discord) {
        if (message.author.id !== '307921446225838080') return;

        const id = args[0];
        if (!id) return message.reply("Please specify a guild id").then((msg) => {
            message.delete();
            msg.delete({ timeout: 5000 });
        });

        if (!client.guilds.cache.has(id)) return message.reply("Im not in that server").then((msg) => {
            message.delete();
            msg.delete({ timeout: 5000 });
        });

        schema.findOne({
            Server: id
        }, async (err, data) => {
            if (data) return message.reply("`This server has already been blacklisted before`").then((msg) => {
                message.delete();
                msg.delete({ timeout: 5000 });
            });

            new schema({
                Server: id
            }).save();
            message.reply("Blacklisted a new server");
        });
    },
};