const fetch = require("node-fetch")
const https = require("https")

module.exports = {
    name: 'ip',
    async execute(message, args, cmd, client, Discord) {
        const args3 = message.content.slice("!ip".length).split(' ');
        const code = args3[1]
        const urlfivem = "https://servers-live.fivem.net/api/servers/single/" + code

        https.get(urlfivem, function (res) {
            if (res.statusCode == 404) {

                const embedERROR = new Discord.MessageEmbed()
                    .setColor("4e13df")
                    .setDescription(`**Invalid format!**\r\n\`!ip <cfx_code>\``)
                message.channel.send(embedERROR);
            } else {
                fetch(urlfivem)
                    .then(res => res.json())
                    .then((out) => {
                        if (!out["Data"]["connectEndPoints"][0].startsWith("http")) {
                            const split = `${out["Data"]["connectEndPoints"][0]}`.split(":")
                            const urlip = "http://ip-api.com/json/" + split[0]
                            fetch(urlip)
                                .then(res => res.json())
                                .then((out2) => {
                                    if (out["icon"]) {
                                        const icon = out2["icon"]
                                        let file = new Buffer.from(icon, 'base64')
                                        const att = new Discord.MessageAttachment(file, "graph.png")
                                        const embed = new Discord.MessageEmbed()
                                            .setColor("#4e13df")
                                            .addField("\u200B", `IP:Port --> \`${out["Data"]["connectEndPoints"][0]}\`\n ISP: \`${out2["isp"]}\``)
                                        message.channel.send(embed);
                                    } else {
                                        const embedFINISH = new Discord.MessageEmbed()
                                            .setColor("#4e13df")
                                            .addField("\u200B", `**IP:Port** → \`${out["Data"]["connectEndPoints"][0]}\`\n **ISP** → \`${out2["isp"]}\``)
                                            .addField("Utils", `*Info.json* → [Info](http://${out["Data"]["connectEndPoints"][0]}/info.json)\r\n*Dynamic.json* → [Dynamic](http://${out["Data"]["connectEndPoints"][0]}/dynamic.json)\r\n*Players.json* → [Players](http://${out["Data"]["connectEndPoints"][0]}/players.json)`)
                                        message.channel.send(embedFINISH);
                                    }
                                })
                        }
                    })
            }
        })
    }
}