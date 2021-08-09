const axios = require('axios');

module.exports = {
    name: 'joke',
    description: 'Gives you a funny joke (maybe :/)',
    async execute(message, args, cmd, client, Discord) {
        axios.get('https://official-joke-api.appspot.com/random_joke')
            .then(res => {

                const joke = res.data.setup;

                const answer = res.data.punchline;

                message.channel.send(new Discord.MessageEmbed()
                    .setTitle(`Here is a joke!`)
                    .setDescription(`${joke}\n\n||${answer}||`)
                    .setColor('#4e13df')
                )
            })
    }
}