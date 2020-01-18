module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
		message.channel.send("Ping?").then((msg) => {
			msg.edit(
			`**Pong!** :ping_pong:\n**Latency** is \`${msg.createdTimestamp - message.createdTimestamp}\`ms.\n**API Latency** is \`${Math.round(args)}\`ms.`);
		})
	},
};