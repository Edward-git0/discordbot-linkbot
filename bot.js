const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token, version, status } = require('./config.json');
//const db_url = 'mongodb+srv://pseudorandomness:UT2WYeH7HhRUzgUh@cluster0-uzi93.mongodb.net/test?retryWrites=true&w=majority';

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


client.on('ready', () => {
    console.log("Update");
    client.channels.get('668131178900881428').send("<@338509501290250240>, I'm updated!");
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch(command) {
        case "ping":
            client.commands.get('ping').execute(message, client.ping);
        break;
        case "avatar":
            client.commands.get('avatar').execute(message, args);
        break;
        case "purge":
            message.reply(args[0]);
            client.commands.get('purge').execute(message, args);
        break;
        case "version":
            message.channel.send("Version: " + version);
        break;
        case "status": 
            message.channel.send(status); 
        break;
    }
});

 
//client.mongoose.init();
client.login(token);
