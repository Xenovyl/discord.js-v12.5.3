module.exports = {
    name: 'suggestions',
    description: "advanced suggestions command [ACCEPT, DENY]",
    aliases: ['suggest', 'suggestion', 'advice'],
    async execute(message, args, cmd, client, Discord) {
        const AcceptEmoji = '820345505464582165';
        const DenyEmoji = '820345769243836427';

        if (args[0] !== 'accept' && args[0] !== 'deny') {
            const query = args.join(" ");
            if (!query) return message.reply("`Please specify a suggestion!`").then((msg) => {
                message.delete();
                msg.delete({ timeout: 5000 });
            });

            const embed = new Discord.MessageEmbed()
                .setColor('YELLOW')
                .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`${query}`)
                .addField("Status", "📊 Waiting for community feedback, please vote!")
            message.guild.channels.cache.get("840510489033048114").send(embed).then((msg) => {
                msg.react(AcceptEmoji);
                msg.react(DenyEmoji);
                message.delete();
            });

        } else if (args[0] === "accept") {
            if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply('`You do not own enough permissions to execute this command.`').then((msg) => {
                message.delete();
                msg.delete({ timeout: 5000 });
            });

            const messageID = args[1];
            const acceptQuery = args.slice(2).join(" ");

            if (!messageID) return message.lineReply("**Please specify a message ID**\r\n`!suggestion accept <MESSAGE_ID>`").then((msg) => {
                message.delete();
                msg.delete({ timeout: 5000 });
            });

            try {
                const suggestionsChannel = message.guild.channels.cache.get("840510489033048114");
                const suggestedEmbed = await suggestionsChannel.messages.fetch(messageID);

                const data = suggestedEmbed.embeds[0];

                if (!acceptQuery) {
                    const acceptEmbed = new Discord.MessageEmbed()
                        .setColor("GREEN")
                        .setAuthor(data.author.name, data.author.iconURL)
                        .setDescription(data.description)
                        .addField("Status", `✅ Accepted idea! Expect this soon.`)
                    suggestedEmbed.edit(acceptEmbed).then(message.delete());
                }

                if (acceptQuery) {
                    const acceptReasonEmbed = new Discord.MessageEmbed()
                        .setColor("GREEN")
                        .setAuthor(data.author.name, data.author.iconURL)
                        .setDescription(data.description)
                        .addField("Status", `✅ Accepted idea! Expect this soon. Reason: ${acceptQuery}`)
                    suggestedEmbed.edit(acceptReasonEmbed).then(message.delete());
                }
            } catch (err) {
                console.log(err);
                message.reply("`That suggestion does not exist.`").then((msg) => {
                    message.delete();
                    msg.delete({ timeout: 5000 });
                });
            }

        } else if (args[0] === "deny") {
            if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply('`You do not own enough permissions to execute this command.`').then((msg) => {
                message.delete();
                msg.delete({ timeout: 5000 });
            });

            const messageID = args[1];
            const denyQuery = args.slice(2).join(" ");

            if (!messageID) return message.reply("**Please specify a message ID**\r\n`!suggestion deny <MESSAGE_ID>`").then((msg) => {
                message.delete();
                msg.delete({ timeout: 5000 });
            });

            try {
                const suggestionsChannel = message.guild.channels.cache.get("840510489033048114");
                const suggestedEmbed = await suggestionsChannel.messages.fetch(messageID);

                const data = suggestedEmbed.embeds[0];

                if (!denyQuery) {
                    const denyEmbed = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setAuthor(data.author.name, data.author.iconURL)
                        .setDescription(data.description)
                        .addField("Status", `❌ Thank you for the feedback, but we are not interested in this idea at this time.`)
                    suggestedEmbed.edit(denyEmbed).then(message.delete());
                }

                if (denyQuery) {
                    const denyReasonEmbed = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setAuthor(data.author.name, data.author.iconURL)
                        .setDescription(data.description)
                        .addField("Status", `❌ Thank you for the feedback, but we are not interested in this idea at this time. Reason: ${denyQuery}`)
                    suggestedEmbed.edit(denyReasonEmbed).then(message.delete());
                }
            } catch (err) {
                console.log(err);
                message.reply("`That suggestion does not exist.`").then((msg) => {
                    message.delete();
                    msg.delete({ timeout: 5000 });
                });
            }
        }
    },
};