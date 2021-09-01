require('dotenv').config();
const cooldown = require('../../models/cooldowns');
const profileModel = require("../../models/profileSchema");
const { afk } = require("../../Collection");
const { reason } = require('../../commands/utils/afk');
const moment = require('moment');
const db = require('quick.db');
const blacklistServers = require('../../models/blacklist-servers');
const premiumSchema = require('../../models/premium-user');

module.exports = async (Discord, client, message) => {
  const prefix = process.env.PREFIX;

  // BLACKLIST CHECK

  let blacklisted = db.get(`blacklist_${message.author.id}`);

  if (blacklisted === 1) return message.reply("**You are blacklisted, that means you can't execute any command**").then((msg) => {
    message.delete();
    msg.delete({ timeout: 5000 });
  });

  // STICKY MESSAGE

  if (message.author.bot) return;

  const MyStickyChannelID = '808991692363399172';

  async function remove(id) {
    const msg = message.channel.messages.cache.get(id);
    client.cacheMsgs.shift();
    if (msg) await msg.delete().catch(_e => { });
  }

  if (message.channel.id === MyStickyChannelID) {
    if (client.cacheMsgs.length >= 2 && client.cacheMsgs.length !== 0) return client.cacheMsgs.forEach(async id => remove(id));

    if (client.cacheMsgs.length > 0) client.cacheMsgs.forEach(async id => await remove(id));

    const embed = new Discord.MessageEmbed()
      .setColor("#4e13df")
      .setDescription("TO GET PERMS ASK <@307921446225838080>")
      .setTimestamp()
    const m = await message.channel.send(embed);
    client.cacheMsgs.push(m.id);
  }

  //////////////////////////////////////////////////////////////////////

  // AFK-SYSTEM

  if (!message.guild || message.author.bot) return;

  const mentionedMember = message.mentions.members.first();
  if (mentionedMember) {
    const data = afk.get(mentionedMember.id);

    if (data) {
      const [timestamp, reason] = data;
      const timeAgo = moment(timestamp).fromNow();
      const AFKtimeago = new Discord.MessageEmbed()
        .setColor("#4e13df")
        .setDescription(`${mentionedMember} is currently AFK (${timeAgo})\nReason: ${reason}`)
      message.reply(AFKtimeago);
    };
  }

  const getData = afk.get(message.author.id);
  if (getData) {
    afk.delete(message.author.id);
    const AFKembed = new Discord.MessageEmbed()
      .setColor("#4e13df")
      .setDescription(`${message.member} afk has been removed!`)
    message.reply(AFKembed);
  }

  // Banned Words

  if (!message.guild || message.author.bot) return;
  let invs = [];
  await message.guild.fetchInvites().then(inv => {
    inv.forEach(invites => {
      invs.push(invites?.code);
    });
  });
  if (message.guild.fetchVanityData?.code) invs.push(message.guild.fetchVanityData?.code)

  for (let i of ['discord.gg/', 'discord.com/invite/', 'discord.me/']) {
    if (message.content.includes(i)) {
      if (!invs.length) {
        message.delete();
        return message.reply(
          new Discord.MessageEmbed()
            .setDescription(`<@${message.author.id}>, **please do not send links of other servers!**`)
            .setColor('RED')
        ).then((msg) => msg.delete({ timeout: 5000 }))
      }

      let args = message.content.split(i);
      args.shift();
      args[0].split(/ +/);

      for (let arg of args) {
        if (!invs.includes(arg)) {
          message.delete();
          return message.reply(
            new Discord.MessageEmbed()
              .setDescription(`<@${message.author.id}>, **please do not send links of other servers!**`)
              .setColor('RED')
          ).then((msg) => msg.delete({ timeout: 5000 }))
        }
      }
    }
  }

  let profileData;
  try {
    profileData = await profileModel.findOne({ userID: message.author.id });
    if (!profileData) {
      let profile = await profileModel.create({
        username: message.author.username,
        userID: message.author.id,
        serverID: message.guild.id,
        bits: 1000,
        bank: 0,
        time: message.createdAt
      });
      profile.save();
    }
  } catch (err) {
    console.log(err);
  }

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
  if (!command) return message.reply(`\`This command doesn't exist!\``).then((msg) => {
    message.delete();
    msg.delete({ timeout: 5000 });
  });

  if (command.premium && !(await premiumSchema.findOne({ User: message.author.id }))) return message.reply("\`You need to upgrade to premium to use this command\`").then((msg) => {
    message.delete();
    msg.delete({ timeout: 5000 });
  });

  const validPermissions = [
    "CREATE_INSTANT_INVITE",
    "KICK_MEMBERS",
    "BAN_MEMBERS",
    "ADMINISTRATOR",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "ADD_REACTIONS",
    "VIEW_AUDIT_LOG",
    "PRIORITY_SPEAKER",
    "STREAM",
    "VIEW_CHANNEL",
    "SEND_MESSAGES",
    "SEND_TTS_MESSAGES",
    "MANAGE_MESSAGES",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "READ_MESSAGE_HISTORY",
    "MENTION_EVERYONE",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_GUILD_INSIGHTS",
    "CONNECT",
    "SPEAK",
    "MUTE_MEMBERS",
    "DEAFEN_MEMBERS",
    "MOVE_MEMBERS",
    "USE_VAD",
    "CHANGE_NICKNAME",
    "MANAGE_NICKNAMES",
    "MANAGE_ROLES",
    "MANAGE_WEBHOOKS",
    "MANAGE_EMOJIS",
  ];

  const blacklistedServers = await blacklistServers.findOne({
    Server: message.guild.id
  });
  if (blacklistedServers) return message.reply(`\`This server has been blacklisted by the owner to get this problem solved please contact him\``).then((msg) => {
    message.delete();
  });

  if (command.cooldown) {
    const current_time = Date.now();
    const cooldown_amount = (command.cooldown) * 1000

    cooldown.findOne({ userId: message.author.id, cmd: command.name }, async (err, data) => {
      if (data) {
        const expiration_time = data.time + cooldown_amount;

        if (current_time < expiration_time) {
          const time_left = (expiration_time - current_time) / 1000

          if (time_left.toFixed(1) >= 3600) {
            let hour = (time_left.toFixed(1) / 3600);
            return message.reply(`Please wait ${parseInt(hour)} more hours before using the \`${command.name}\` command!`)
          }
          if (time_left.toFixed(1) >= 60) {
            let minute = (time_left.toFixed(1) / 60);
            return message.reply(`Please wait ${parseInt(minute)} more minutes before using the \`${command.name}\` command!`)
          }
          let seconds = (time_left.toFixed(1));
          return message.reply(`Please wait ${parseInt(seconds)} more seconds before using the \`${command.name}\` command!`)
        } else {
          await cooldown.findOneAndUpdate({ userId: message.author.id, cmd: command.name }, { time: current_time });
          command.execute(message, args, cmd, client, Discord, profileData);
        }
      } else {
        command.execute(message, args, cmd, client, Discord, profileData);
        new cooldown({
          userId: message.author.id,
          cmd: command.name,
          time: current_time,
          cooldown: command.cooldown,
        }).save();
      }
    })
  } else {
    command.execute(message, args, cmd, client, Discord, profileData).catch((err) => {
      message.reply(`\`There was an error trying to execute this command!\``).then((msg) => {
        message.delete();
        msg.delete({ timeout: 5000 });
      });
      console.log(err);
    })
  };
};