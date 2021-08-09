const SnakeGame = require('snakecord');

module.exports = {
    name: 'snakegame',
    aliases: ['snake'],
    async execute(message, args, cmd, client, Discord) {
        const snakeGame = new SnakeGame({
            title: 'Snake Game',
            color: "GREEN",
            timestamp: true,
            gameOverTitle: "Game Over"
        });
        return snakeGame.newGame(message);
    }
}