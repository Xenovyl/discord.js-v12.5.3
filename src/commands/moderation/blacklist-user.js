const db = require("quick.db");

module.exports = {
    name: 'blacklist',
    description: 'Blacklists a user from using the bot',
    aliases: ['block'],
    permissions: ['BAN_MEMBERS'],
    async execute(message, args, cmd, client, Discord) {
        var prefix = process.env.PREFIX;

        if (message.author.id != '307921446225838080') return message.channel.send("`You do not own enough permissions to use this command.`").then((msg) => {
            message.delete();
            msg.delete({ timeout: 5000 });
        });;

        if (args[0] === 'remove') {
            let user = message.mentions.users.first();

            if (!user) return message.reply(`**You forgot to specify a user!**\r\n\`${process.env.PREFIX}blacklist remove <@user or ID>\``).then((msg) => {
                message.delete();
                msg.delete({ timeout: 7000 });
            });

            let blacklist = db.get(`blacklist_${user.id}`)

            if (blacklist === 0 || blacklist === null) return message.channel.send(`${user} is not blacklisted`).then((msg) => {
                message.delete();
                msg.delete({ timeout: 5000 });
            });

            const whitelister = message.author;

            const embed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle('BLACKLIST REMOVED!')
                .setDescription(`Your blacklist has been removed from ${message.guild.name}`)
                .setFooter(`By ${whitelister.tag}`, admin.displayAvatarURL({ dynamic: true }))
            user.send(embed);

            const WhitelistEmbed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${user} blacklist has been removed.**`)
            message.channel.send(WhitelistEmbed).then(message.delete())
            db.delete(`blacklist_${user.id}`, 1)

        } else {
            let user;
            if (message.mentions.users.first()) {
                admin = message.author;
                user = message.mentions.users.first();
            } else if (args[0]) {
                user = message.guild.members.cache.get(args[0]).user;
            }

            if (!user) return message.reply(`**You forgot to specify a user!**\r\n\`${process.env.PREFIX}blacklist <@user or ID>\`\r\n\`${process.env.PREFIX}blacklist remove <@user or ID>\``).then((msg) => {
                message.delete();
                msg.delete({ timeout: 7000 });
            });

            let blacklist = db.get(`blacklist_${user.id}`)

            const blacklister = message.author;

            if (blacklist === null) {
                db.set(`blacklist_${user.id}`, 1);
                const embed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle(`BLACKLISTED from ${message.guild.name}`)
                    .setDescription('Damn, It looks like you have been blacklisted... sad')
                    .setFooter(`By ${blacklister.tag}`, admin.displayAvatarURL({ dynamic: true }))
                user.send(embed);


                const BlacklistEmbed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setDescription(`**${user} is now BLACKLISTED**`)
                message.channel.send(BlacklistEmbed).then(message.delete());
            } else if (blacklist !== null) {
                message.reply(`**${user} is already BLACKLISTED!**`).then((msg) => {
                    message.delete();
                    msg.delete({ timeout: 5000 });
                });
            } return;
        }
    },
};