const db = require('../../models/keys-list');
const db1 = require('../../models/keys-users');

module.exports = {
    name: 'key-activate',
    description: 'Activate your key!',
    aliases: ['keyactivate'],
    async execute(message, args, cmd, client, Discord) {
        let key = args.join(" ");
        if (!key) return message.reply(`\`Please provide the key you wanna activate!\``).then((msg) => {
            message.delete();
            msg.delete({ timeout: 5000 });
        });
        if (key.length > 9) return message.reply(`\`That is an invalid key!\``).then((msg) => {
            message.delete();
            msg.delete({ timeout: 5000 });
        });

        db.findOne({
            client: client.user.id
        }, async (err, data) => {
            if (!data) return message.reply(`\`The are no generated keys available right now!\``).then((msg) => {
                message.delete();
                msg.delete({ timeout: 5000 });
            });
            let wew = data;
            if (data.keys.includes(key)) {
                db1.findOne({
                    user: message.author.id
                }, async (err, data) => {
                    if (!data) {
                        data = new db1({
                            user: message.author.id,
                            key
                        }).save()

                        removeA(wew.keys, key)
                        wew.save();

                        message.reply(`\`Key successfully activated\``)
                    } else {
                        return message.reply(`\`You already have a key active!\``)
                    }
                })
            }
        });
    },
};

function removeA(arr) {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
};