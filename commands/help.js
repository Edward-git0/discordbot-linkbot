module.exports = {
    name: "help",
    description: "Here to help!",
    category: "general",
    execute(message, args, Discord, commands) {
        for (const command of commands) {
            message.channel.send(command['description']);
        }
    }
}