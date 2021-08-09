const { MessageButton } = require('discord-buttons');

module.exports = {
    name: 'help',
    async execute(message, args, cmd, client, Discord) {
        if (cmd === 'help') {
            const servericon = message.guild.iconURL()

            const firstBUTTON = new MessageButton()
                .setStyle("blurple")
                .setID("previous_embed")
                .setLabel("<")
            const secondBUTTON = new MessageButton()
                .setStyle("blurple")
                .setID("next_Information")
                .setLabel(">")
            const thirdBUTTON = new MessageButton()
                .setStyle("blurple")
                .setID("next_Fun")
                .setLabel(">")
            const fourthBUTTON = new MessageButton()
                .setStyle("blurple")
                .setID("stop")
                .setLabel("<")
            const lastBUTTON = new MessageButton()
                .setStyle("blurple")
                .setID("back")
                .setLabel(">")
            const embed = new Discord.MessageEmbed()
                .setColor('#4e13df')
                .setTitle('Bot Information')
                .addField('**Prefix**', `Bots prefix is: \`${process.env.PREFIX}\``)
                .addField('**Pages**', '`1. Bot Information`\r\n`2. Information`\r\n`3. Fun`')
                .addField('**Navigation Help**', 'Use the arrows below to look through the pages!')
                .setThumbnail(servericon)
            const Information = new Discord.MessageEmbed()
                .setColor('#4e13df')
                .setTitle('Information')
                .addField(`\`!profile\``, 'Shows you the @user`s profile!')
                .addField(`\`!avatar\``, 'Shows you the @user`s avatar!')
                .addField(`\`!server-icon\``, "Shows you the server's icon")
                .addField(`\`!invite\``, 'Gives you the server invite!')
                .addField(`\`!translate\``, 'Translates a sentence!')
                .addField(`\`!remind\``, 'Its a reminder...')
                .addField(`\`!weather\``, 'Use this command to check the weather from any place all over the world!')
                .addField(`\`!sourcebin\``, 'Lets you able to post your code directly on sourcebin')
                .addField(`\`!image\``, 'Sends you the image you requested!')
                .addField(`\`!urban\``, 'Tells you the meaning of a word or sentence')
                .addField(`\`!covid\``, 'Gives you the actualy cases informations about covid-19')
                .addField(`\`!wikipedia\``, 'You can search wikipedia pages by using this command')
                .addField(`\`!youtube\``, 'Search a youtube video using this command')
                .addField(`\`!djs-docs\``, 'Gives you discord.js documention requested.')
                .addField(`\`!report-bug\``, 'Report a bug through this command, thanks!')
                .addField(`\`!apply\``, 'If you want to apply for staff')
            const Fun = new Discord.MessageEmbed()
                .setColor('#4e13df')
                .setTitle('Fun')
                .addField(`\`!8ball\``, 'Ask a question and the bot will respond...')
                .addField(`\`!meme\``, 'Sends a random meme from random meme redits!')
                .addField(`\`!howgay\``, 'Tells you how gay someone is 👀')
                .addField(`\`!rps\``, 'Play rock paper scissors against the bot')
                .addField(`\`!tictactoe\``, 'Play tictactoe against a specified user!')
                .addField(`\`!joke\``, 'Gives you a funny joke (maybe :/)')
                .addField(`\`!slots\``, 'Lets you play slot machines!')
                .addField(`\`!snake\``, 'Its a simple snake game!')
                .addField(`\`!guess\``, 'Guess the number to win!')
                .addField(`\`!pokedex\``, 'Gives you informations about a pokemon!')

            let NATIVEmessage = await message.channel.send({ embed: embed, buttons: [firstBUTTON, secondBUTTON] }).then(message.delete());

            const collector = NATIVEmessage.createButtonCollector((button) => button.clicker.user.id === message.author.id, { time: 60e3 });

            collector.on("collect", (b) => {
                b.defer();
                if (b.id === 'next_Information') {
                    NATIVEmessage.edit({ embed: Information, buttons: [firstBUTTON, thirdBUTTON] });
                } else if (b.id === 'previous_embed') {
                    NATIVEmessage.edit({ embed: embed, buttons: [firstBUTTON, secondBUTTON] });
                } else if (b.id === 'next_Fun') {
                    NATIVEmessage.edit({ embed: Fun, buttons: [fourthBUTTON, lastBUTTON] });
                } else if (b.id === 'stop') {
                    NATIVEmessage.edit({ embed: Information, buttons: [firstBUTTON, thirdBUTTON] });
                }
            });
        }
    },
};