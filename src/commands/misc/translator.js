const translate = require('@iamtraction/google-translate');

module.exports = {
    name: 'translate',
    descriptions: 'this command translates a sentence',
    async execute(message, args, cmd, client, Discord) {
        const query = args.join(" ")
        if (!query) return message.reply('**Please specify a text to translate**\r\n`!translate <text>`')

        const translated = await translate(query, { to: 'en' });
        message.reply(`your text has been translated: \`${translated.text}\``);
    }
}