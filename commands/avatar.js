module.exports = {
	name: 'avatar',
	description: 'Users avatar',
	category: "general",
	execute(message, args) {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
        }
	},
};