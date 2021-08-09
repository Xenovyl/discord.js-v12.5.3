const premiumSchema = require('../../models/premium-user');

module.exports = {
    name: 'premium',
    async execute(message, args, cmd, client, Discord) {
        if (message.author.id !== '307921446225838080') return message.reply("You're not authorized in using this command");
        if (!args[0]) return message.reply(`Please specify a query:\r\n\`${process.env.PREFIX}premium add/remove <user>\``);
        const member = message.mentions.users.first() || message.guild.members.cache.get(args[1]);

        if (!member) return message.reply(`\`Pleace specify a valid member\``).then((msg) => {
            message.delete();
            msg.delete({ timeout: 5000 });
        });

        if (args[0] === 'add') {
            premiumSchema.findOne({
                User: member.id
            }, async (err, data) => {
                if (data) return message.reply(`${member} \`has already gained premium features\``).then((msg) => {
                    message.delete();
                    msg.delete({ timeout: 5000 });
                });

                new premiumSchema({
                    User: member.id
                }).save();
                return message.reply(`\`Added\` ${member} \`to the premiun list\``).then((msg) => {
                    message.delete();
                    msg.delete({ timeout: 5000 });
                });
            });

        } else if (args[0] === 'remove') {
            premiumSchema.findOne({
                User: member.id
            }, async (err, data) => {
                if (!data)
                    return message.reply(`${member} \`was previously not added to the premium list\``).then((msg) => {
                        message.delete();
                        msg.delete({ timeout: 5000 });
                    });
                data.delete();
                message.channel.send(`${member} \`has been removed from the premium list\``).then((msg) => {
                    message.delete();
                    msg.delete({ timeout: 5000 });
                });
            });
        }
    },
};