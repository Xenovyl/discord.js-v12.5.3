const db = require('../../models/keys-list');

module.exports = {
    name: 'keys-generate',
    description: 'Generate keys!',
    aliases: ['key-generate', 'keysgenerate', 'keygenerate'],
    async execute(message, args, cmd, client, Discord) {
        if (!message.author.id === '307921446225838080') return message.reply(`\`You can't execute this command\``).then((msg) => {
            message.delete();
            msg.delete({ timeout: 5000 });
        });

        function generatePassword() {
            var length = 9,
                charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                retVal = "";
            for (var i = 0, n = charset.length; i < length; ++i) {
                retVal += charset.charAt(Math.floor(Math.random() * n));
            }
            return retVal;
        }

        let key = generatePassword();

        await db.findOne({
            client: client.user.id
        }, async (err, data) => {
            if (!data) {
                data = new db({
                    client: client.user.id,
                    keys: [key]
                }).save()
                const keyGenerated = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`Key successfully generated:\n**KEY**: || ${key} ||`)
                return message.channel.send(keyGenerated).then(message.delete());
            } else {
                data.keys.push(key);
                data.save();
                const keyGenerated = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`Key successfully generated:\n**KEY**: || ${key} ||`)
                return message.channel.send(keyGenerated).then(message.delete());
            }
        });
    },
};