const weather = require('weather-js');

module.exports = {
    name: 'weather',
    aliases: ['meteo'],
    async execute(message, args, cmd, client, Discord) {

        weather.find({ search: args.join(" "), degreeType: 'C' }, function (error, result) {
            // 'C' can be changed to 'F' for farneheit results
            if (!args[0]) return message.reply('**Please specify a location**\r\n`!weather <location>`');

            if (result === undefined || result.length === 0) return message.channel.send('**Invalid** location');

            var current = result[0].current;
            var location = result[0].location;

            const weatherinfo = new Discord.MessageEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather forecast for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor('#4e13df')
                .addField('Timezone', `UTC${location.timezone}`, true)
                .addField('Degree Type', 'Celsius', true)
                .addField('Temperature', `${current.temperature}°`, true)
                .addField('Wind', current.winddisplay, true)
                .addField('Feels like', `${current.feelslike}°`, true)
                .addField('Humidity', `${current.humidity}%`, true)
            message.channel.send(weatherinfo).then((msg) => {
                setTimeout(() => message.delete());
            }).catch((err) => {
                message.reply("`There was an error trying to execute this command!`");
                throw err;
            });
        })
    },
};