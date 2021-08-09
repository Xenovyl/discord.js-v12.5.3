module.exports = {
    name: 'slots',
    aliases: ['slotmachine', 'slot-machine'],
    async execute(message, args, cmd, client, Discord) {
        const slots = [':grapes:', ':cherries:', ':lemon:'];
        const slotOne = slots[Math.floor(Math.random() * slots.length)];
        const slotTwo = slots[Math.floor(Math.random() * slots.length)];
        const slotThree = slots[Math.floor(Math.random() * slots.length)];
        const slotfour = slots[Math.floor(Math.random() * slots.length)];
        const slotfive = slots[Math.floor(Math.random() * slots.length)];
        const slotsix = slots[Math.floor(Math.random() * slots.length)];
        const slotseven = slots[Math.floor(Math.random() * slots.length)];
        const sloteight = slots[Math.floor(Math.random() * slots.length)];
        const slotnine = slots[Math.floor(Math.random() * slots.length)];
        message.react(`🎰`);
        if (slotOne === slotTwo && slotOne === slotThree || slotfour === slotfive && slotfour === slotsix || slotseven === sloteight && slotseven === slotnine) {
            const won = new Discord.MessageEmbed()
                .setColor("#4cc548")
                .addField("|-----|-----|----|", `|${slotfour}|${slotfive}|${slotsix}|`)
                .addField("|-----|-----|----|", `|${slotOne}|${slotTwo}|${slotThree}|`)
                .addField("|-----|-----|----|", `|${slotseven}|${sloteight}|${slotnine}|`)
                .setFooter("Wow! " + message.author.username + " Congratulations!");
            message.channel.send(won)
        } else {
            const lost = new Discord.MessageEmbed()
                .setColor("RED")
                .addField("|-----|-----|----|", `|${slotfour}|${slotfive}|${slotsix}|`)
                .addField("|-----|-----|----|", `|${slotOne}|${slotTwo}|${slotThree}|`)
                .addField("|-----|-----|----|", `|${slotseven}|${sloteight}|${slotnine}|`)
                .setFooter("Awww " + message.author.username + " better luck next time. Try again");
            message.channel.send(lost)
        }
    }
}