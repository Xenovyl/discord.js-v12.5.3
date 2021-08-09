const { readdirSync } = require("fs");
const prefix = '-';

module.exports = {
    name: "advanced-help",
    description: "Advanced help command for administrators",
    aliases: ['helpadmin', 'help-admin','adv-help', 'advhelp', 'helpadv', 'help-adv'],
    permissions: ['ADMINISTRATOR'],
    async execute(message, args, cmd, client, Discord) {
        if (!args[0]) {
            let categories = [];

            readdirSync("./src/commands/").forEach((dir) => {
                const commands = readdirSync(`./src/commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );

                const cmds = commands.map((command) => {
                    let file = require(`../../commands/${dir}/${command}`);

                    if (!file.name) return "No command name.";

                    let name = file.name.replace(".js", "");

                    return `\`${name}\``;
                });

                let data = new Object();

                data = {
                    name: dir.toUpperCase(),
                    value: cmds.length === 0 ? "In progress." : cmds.join(" "),
                };

                categories.push(data);
            });

            const embed = new Discord.MessageEmbed()
                .setTitle("📬 Need help? Here are all of my commands:")
                .addFields(categories)
                .setDescription(
                    `Use \`${prefix}help-admin\` followed by a command name to get more additional information on a command. For example: \`${prefix}help-admin ban\`.`
                )
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                )
                .setTimestamp()
                .setColor("#4e13df");
            return message.channel.send(embed);
        } else {
            const command =
                client.commands.get(args[0].toLowerCase()) ||
                client.commands.find(
                    (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
                );

            if (!command) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
                    .setColor("#4e13df");
                return message.channel.send(embed);
            }

            const embed = new Discord.MessageEmbed()
                .setTitle("Command Details:")
                .addField(
                    "COMMAND:",
                    command.name ? `\`${command.name}\`` : "No name for this command."
                )
                .addField(
                    "ALIASES:",
                    command.aliases
                        ? `\`${command.aliases.join("` `")}\``
                        : "No aliases for this command."
                )
                .addField(
                    "USAGE:",
                    command.usage
                        ? `\`${prefix}${command.name} ${command.usage}\``
                        : `\`${prefix}${command.name}\``
                )
                .addField(
                    "DESCRIPTION:",
                    command.description
                        ? command.description
                        : "No description for this command."
                )
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                )
                .setTimestamp()
                .setColor("#4e13df");
            return message.channel.send(embed);
        }
    },
};