const fetch = require('node-fetch');

module.exports = {
    name: "npm",
    aliases: ["searchpackage", 'search-package', 'package'],
    async execute(message, args, cmd, client, Discord) {
        const npm = args[0];
        if (!npm) return message.reply('Please provide a package name!');

        let response
        try {
            response = await fetch('https://api.npms.io/v2/search?q=' + args[0]).then(res => res.json())
        }
        catch (e) {
            return message.reply('An error occured!! Try again later!')
        }
        try {
            const pkg = response.results[0].package
            const embed = new Discord.MessageEmbed()
                .setTitle(pkg.name)
                .setColor('WHITE')
                .setURL(pkg.links.npm)
                .setThumbnail('https://images-ext-1.discordapp.net/external/JsiJqfRfsvrh5IsOkIF_WmOd0_qSnf8lY9Wu9mRUJYI/https/images-ext-2.discordapp.net/external/ouvh4fn7V9pphARfI-8nQdcfnYgjHZdXWlEg2sNowyw/https/cdn.auth0.com/blog/npm-package-development/logo.png')
                .setDescription(pkg.description)
                .addField('Author:-', pkg.author ? pkg.author.name : 'None')
                .addField('Version:-', pkg.version)
                .addField('Repository:-', pkg.links.repository ? pkg.links.repository : 'None')
                .addField('Maintainers:-', pkg.maintainers ? pkg.maintainers.map(e => e.username).join(', ') : 'None')
                .addField('Keywords:-', pkg.keywords ? pkg.keywords.join(', ') : 'None')
                .setTimestamp()
            message.channel.send(embed);
        }
        catch (e) {
            message.reply('No package found!');
        }
    },
};