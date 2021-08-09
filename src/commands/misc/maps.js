const fetch = require("node-fetch");

module.exports = {
    name: 'maps',
    descripion: "founds the location you asked through google maps || Maps finder",
    async execute(message, args, cmd, client, Discord) {
        const sit = args.join("_")
        if (!args.length) return message.reply("`Provide a valid location`");
        const site = `https://maps.google.com/?q=${args.join("+")}`
        try {
            const msg = await message.channel.send('**Please wait...** This may take up to 10 seconds.').then(message.delete())
            msg.delete({ timeout: 5000 })
            const { body } = await fetch(`https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`);
            let att = new Discord.MessageAttachment(body, `${sit}.png`)
            return message.channel.send(att)
        } catch (err) {
            return message.reply(`**Oh no, an error occurred: \`${err.message}\`. Try again later!**`);
        };
    },
};