const vouchSchema = require('../../models/vouches');

module.exports = {
    name: "vouch",
    aliases: ['ty', 'thx', 'vouch', 'thanks'],
    description: "give a player a voucher",
    async execute(message, args, cmd, client, Discord, profileData) {
        const target = message.mentions.users.first()
        if (!target) {
            message.reply("**Please specify someone to vouch**!\n`!vouch <@user>`")
            return
        }

        const { guild } = message
        const guildId = guild.id
        const targetId = target.id
        const authorId = message.author.id
        const now = new Date()

        if (targetId === authorId) {
            message.reply("`You cannot vouch yourself`")
            return
        }

        const authorData = await vouchSchema.findOne({
            userId: authorId,
            guildId,
        })

        if (authorData && authorData.lastGave) {
            const then = new Date(authorData.lastGave)

            const diff = now.getTime() - then.getTime()
            const diffHours = Math.round(diff / (1000 * 60 * 60))

            const hours = 12
            if (diffHours <= hours) {
                message.reply(
                    `**You have already vouched someone within the last ${hours} hours.**`
                )
                return
            }
        }

        // Update the "lastGave" property for the command sender
        await vouchSchema.findOneAndUpdate(
            {
                userId: authorId,
                guildId,
            },
            {
                userId: authorId,
                guildId,
                lastGave: now,
            },
            {
                upsert: true,
            }
        )

        // Increase how many thanks the target user has had
        const result = await vouchSchema.findOneAndUpdate(
            {
                userId: targetId,
                guildId,
            },
            {
                userId: targetId,
                guildId,
                $inc: {
                    vouches: 1,
                },
            },
            {
                upsert: true,
                new: true,
            }
        )

        const amount = result.vouches
        message.reply(
            `**You have vouched <@${targetId}>! They now have ${amount} vouches.**`
        )
    }
}