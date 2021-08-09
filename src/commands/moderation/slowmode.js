const ms = require('ms');

module.exports = {
    name: 'slowmode',
    description: 'Sets slowmode for a Channel!',
    permissions: ["ADMINISTRATOR"],
    async execute(message, args, cmd, client, Discord) {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('**You do not have **MANAGE_CHANNELS** permission!**')

        if (!args[0]) return message.reply('**You did not specify a time!**\r\n`!slowmode <time> <reason>`').then((msg) => {
            setTimeout(() => message.delete());
        });

        const currentCooldown = message.channel.rateLimitPerUser;

        const reason = args[1] ? args.slice(1).join(' ') : 'no reason';

        const embed = new Discord.MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

        if (args[0] === 'off') {

            if (currentCooldown === 0) return message.reply('**Channel cooldown is already off**').then((msg) => {
                setTimeout(() => message.delete());
            });

            embed.setTitle('Slowmode Disabled')
                .setColor('#4e13df')
            return message.channel.setRateLimitPerUser(0, reason).then(m => m.send(embed)).then((msg) => {
                setTimeout(() => message.delete());
            });
        }

        const time = ms(args[0]) / 1000;

        if (isNaN(time)) return message.reply('**not a valid time, please try again!**')

        if (time >= 21600) return message.reply('**That slowmode limit is too high, please enter anything lower than 6 hours.**')

        if (currentCooldown === time) return message.channel.send(`**Slowmode is already set to** ${args[0]}`).then((msg) => {
            setTimeout(() => message.delete());
        });

        embed.setTitle('Slowmode Enabled')
            .addField('Slowmode: ', args[0])
            .addField('Reason: ', reason)
            .setColor('#323232');

        message.channel.setRateLimitPerUser(time, reason).then(m => m.send(embed)).then((msg) => {
            setTimeout(() => message.delete());
        }).catch((err) => {
            message.reply("`There was an error trying to execute this command!`");
            throw err;
        });
    },
};