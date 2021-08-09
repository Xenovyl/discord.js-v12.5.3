const fetch = require("node-fetch")
const https = require("https")

module.exports = {
    name: 'cfx-info',
    async execute(message, args, cmd, client, Discord) {
        const args3 = message.content.slice("!cfx-info".length).split(' ');
        const code = args3[1]
        const urlfivem = "https://servers-live.fivem.net/api/servers/single/" + code

        https.get(urlfivem, function(res) {
            if (res.statusCode == 404) {

                const embedERROR = new Discord.MessageEmbed()
                    .setColor("#4e13df")
                    .setDescription(`**Invalid format!**\r\n\`!cfx-info <cfx_code>\``)
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
                                            .addField("IP:Port", `\`${out["Data"]["connectEndPoints"][0]}\``)
                                            .addField("Server Details", `IP: \`${split[0]}\`\n Country: \`${out2["country"]}\`\n City: \`${out2["city"]}\`\n ISP: \`${out2["isp"]}\`\n Org: ${out2["org"]}\n Zip Code: \`${out2["zip"]}\`\n Timezone: \`${out2["timezone"]}\`\n`)
                                            .addField("FiveM Server", `Server Name: \`${out["Data"]["hostname"].substring(0, 390)}\`\n\n Online Players: \`${out["Data"]["players"].length}\`\n Max Players: \`${out["Data"]["svMaxclients"]}\`\n Artifacts: \`${out["Data"]["server"]}\`\n Resources: \`${out["Data"]["resources"].length}\`\n Onesync Enabled?: \`${out["Data"]["vars"]["onesync_enabled"]}\`\n`, true)
                                            .setThumbnail("attachment://graph.png")
                                            .attachFiles(att)

                                        message.channel.send(embed);
                                    } else {
                                        const embedFINISH = new Discord.MessageEmbed()
                                            .setColor("#4e13df")
                                            .addField("IP:Port", `\`${out["Data"]["connectEndPoints"][0]}\``)
                                            .addField("Server Details", `IP: \`${split[0]}\`\n Country: \`${out2["country"]}\`\n City: \`${out2["city"]}\`\n ISP: \`${out2["isp"]}\`\n Org: ${out2["org"]}\n Zip Code: \`${out2["zip"]}\`\n Timezone: \`${out2["timezone"]}\`\n`)
                                            .addField("FiveM Server", `Server Name: \`${out["Data"]["hostname"].substring(0, 390)}\`\n\n Online Players: \`${out["Data"]["players"].length}\`\n Max Players: \`${out["Data"]["svMaxclients"]}\`\n Artifacts: \`${out["Data"]["server"]}\`\n Resources: \`${out["Data"]["resources"].length}\`\n Onesync Enabled: \`${out["Data"]["vars"]["onesync_enabled"]}\`\n`, true)
                                        message.channel.send(embedFINISH);
                                    }


                                })

                        } else {
                            const embedERROR2 = new Discord.MessageEmbed()
                                .setColor("#4e13df")
                                .setDescription("```\n Cannot find server details...```")
                                .addField("Cfx Url", `\`${out["Data"]["connectEndPoints"][0]}\``)
                                .addField("FiveM Server", `Server Name: \`${out["Data"]["hostname"].substring(0, 390)}\`\n\n Online Players: \`${out["Data"]["players"].length}\`\n Max Players: \`${out["Data"]["svMaxclients"]}\`\n Artifacts: \`${out["Data"]["server"]}\`\n Resources: \`${out["Data"]["resources"].length}\`\n Onesync Enabled?: \`${out["Data"]["vars"]["onesync_enabled"]}\`\n`, true)
                            message.channel.send(embedERROR2);
                        }
                    })
            }
        })
    }
}