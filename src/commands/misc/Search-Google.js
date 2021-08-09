module.exports = {
    name: "google",
    description: "Search on google",
    async execute(message, args, cmd, client, Discord) {
        const sentence = args.join("+")
        let sntnce = message.content.split(' ');
        sntnce.shift();
        sntnce = sntnce.join(' ');
        if (!sentence) return message.reply('`Please specify a search query.`');
        let embed = new Discord.MessageEmbed()
            .setAuthor('Google', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png')
            .setDescription(
                `**Your Search Query:** \`${sntnce}\`\n\n **Search Result** - [Click Here](https://www.google.com/search?q=${sentence}&oq=${sentence}&aqs=chrome.0.69i59l2j0l2j69i60j69i61l2j69i65.1147j0j7&sourceid=chrome&ie=UTF-8)`
            )
            .setColor('GREEN')
            .setFooter(' ');
        message.channel.send(embed);
    },
};