const fs = require('fs');
// const ascii = require('ascii-table')
// let table = new ascii("Commands");

module.exports = (client, Discord) => {
    const load_dir = (dirs) => {
        const command_files = fs.readdirSync(`./src/commands/${dirs}`).filter(file => file.endsWith('.js'));

        for (const file of command_files) {
            const command = require(`../commands/${dirs}/${file}`)
            if (command.name) {
                client.commands.set(command.name, command);
                // table.addRow(file, '✅')
                // } else {
                //     table.addRow(file, '❌ -> Missing a help.name, or help.name is not a string.')
                //     continue;
            }
        }

    }
    ['fun', 'guild', 'misc', 'moderation', 'utils', 'test'].forEach(e => load_dir(e));

    // console.log(table.toString());
};