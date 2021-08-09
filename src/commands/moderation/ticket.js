module.exports = {
  name: 'ticket',
  async execute(message, args, cmd, client, Discord) {
    if (message.author.id !== '307921446225838080') return message.reply("`You are not authorized in using this command!`")

    const embed = new Discord.MessageEmbed()
      .setColor("#4e13df")
      .setTitle("Tickets")
      .setDescription("**if you need support just open a ticket!**")
    message.channel.send(embed).then((msg) => {
      msg.react('📩')
      message.delete();
    }).catch((err) => {
      message.reply("`There was an error trying to execute this command!`");
      throw err;
    });

    client.on('messageReactionAdd', async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      const inChannel = new Discord.MessageEmbed()
        .setColor('#4e13df')
        .setTitle('**Thank you for contacting support!**')
        .setDescription('')

      switch (reaction.emoji.name) {
        case '📩':
          const channelCreate = await message.guild.channels.create(`ticket: ${user.username}`);
          channelCreate.setParent("819870612071120919");
          channelCreate.updateOverwrite(message.guild.id, {
            SEND_MESSAGE: false,
            VIEW_CHANNEL: false,
          });
          channelCreate.updateOverwrite(reaction.message.guild.members.cache.get(user.id), {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true,
          });

          const reactionMessage = await channelCreate.send(inChannel);
          try {
            await reactionMessage.react("⛔");
          } catch (err) {
            inChannel.send("Error sending emojis!");
            throw err;
          }
          const collector = reactionMessage.createReactionCollector(
            (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("ADMINISTRATOR"),
            { dispose: true }
          );
          collector.on("collect", (reaction, user) => {
            switch (reaction.emoji.name) {
              case "⛔":
                const deleteChannel = new Discord.MessageEmbed()
                  .setColor("#4e13df")
                  .setDescription("**Deleting this channel in 5 seconds!**")
                channelCreate.send(deleteChannel);
                setTimeout(() => channelCreate.delete(), 5000);
                break;
            }
          });
          break;
      }
    })
  }
}