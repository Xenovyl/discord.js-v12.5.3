const fs = require('fs').promises;
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM();
const document = dom.window.document;

module.exports = {
    name: 'transcript',
    async execute(message, args, cmd, client, Discord) {
        if (message.author.bot) return;

        await message.delete();
        let messageCollection = new Discord.Collection();
        let channelMessages = await message.channel.messages.fetch({
            limit: 100
        }).catch(err => console.log(err));

        messageCollection = messageCollection.concat(channelMessages);

        while (channelMessages.size === 100) {
            let lastMessageId = channelMessages.lastKey();
            channelMessages = await message.channel.messages.fetch({ limit: 100, before: lastMessageId }).catch(err => console.log(err));
            if (channelMessages)
                messageCollection = messageCollection.concat(channelMessages);
        }
        let msgs = messageCollection.array().reverse();
        let data = await fs.readFile('./src/commands/utils/transcript-template.html', 'utf8').catch(err => console.log(err));
        if (data) {
            await fs.writeFile('./src/commands/utils/transcript.html', data).catch(err => console.log(err));
            let guildElement = document.createElement('div');
            let guildText = document.createTextNode(message.guild.name);
            guildElement.appendChild(guildText);
            await fs.appendFile('./src/commands/utils/transcript.html', guildElement.outerHTML).catch(err => console.log(err));

            msgs.forEach(async msg => {
                let parentContainer = document.createElement("div");
                parentContainer.className = "parent-container";

                let avatarDiv = document.createElement("div");
                avatarDiv.className = "avatar-container";
                let img = document.createElement('img');
                img.setAttribute('src', msg.author.displayAvatarURL());
                img.className = "avatar";
                avatarDiv.appendChild(img);

                parentContainer.appendChild(avatarDiv);

                let messageContainer = document.createElement('div');
                messageContainer.className = "message-container";

                let nameElement = document.createElement("span");
                let name = document.createTextNode(msg.author.tag + " " + msg.createdAt.toDateString() + " " + msg.createdAt.toLocaleTimeString() + " EST");
                nameElement.appendChild(name);
                messageContainer.append(nameElement);

                if (msg.content.startsWith("```")) {
                    let m = msg.content.replace(/```/g, "");
                    let codeNode = document.createElement("code");
                    let textNode = document.createTextNode(m);
                    codeNode.appendChild(textNode);
                    messageContainer.appendChild(codeNode);
                }
                else {
                    let msgNode = document.createElement('span');
                    let textNode = document.createTextNode(msg.content);
                    msgNode.append(textNode);
                    messageContainer.appendChild(msgNode);
                }
                parentContainer.appendChild(messageContainer);
                await fs.appendFile('./src/commands/utils/transcript.html', parentContainer.outerHTML).catch(err => console.log(err));
            });
        }
        const channel = client.channels.cache.find(channel => channel.id === '822809862466961438')
        const attachment = new Discord.MessageAttachment('./src/commands/utils/transcript.html');
        channel.send(attachment);
    },
};