module.exports = {
    name: "shutdown",
    aliases: ["turnoff"],
    description: "Shuts down the bot !",
    async execute(message, args, cmd, client, Discord) {
        if (message.author.id !== "307921446225838080") return;

        await message.channel.send(`Shutting down...`)
        process.exit();
    },
};