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

/* client.modules = new Discord.Collection();
const moduleFiles = fs.readdirSync('./modules').filter(file => file.endsWith(".js"));
for (const file of moduleFiles) {
    const _module = require(`./modules/${file}`);
    client.modules.set(_module.name, _module);
} */

//client.mongoose = require('./utils/mongoose.js');

client.on('ready', () => {
    console.log("Update");
    client.channels.get('668131178900881428').send("<@338509501290250240>, I'm updated!");
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split('/ +/');
    const command = args.shift().toLowerCase();

    switch(command) {
        case "ping":
            client.commands.get('ping').execute(message, client.ping);
        break;
        case "avatar":
            client.commands.get('avatar').execute(message, args);
        break;
        case "version":
            message.channel.send("Version: " + version);
        break;
        case "status": 
            message.channel.send(status); 
        break;
        case "bot":
            let uptime = client.uptime / 1000;
            if(uptime > 60) {
                uptime = Math.round(uptime / 60);
                if(uptime > 60) {
                    uptime = Math.round(uptime / 60);
                    uptime = uptime.toString()+" Hours";
                } else { if(uptime == 1) { uptime = uptime.toString()+" Minute"; } else { uptime = uptime.toString()+" Minutes"; }}
            } else { uptime = uptime.toString()+" Seconds"; }
            const embed = new Discord.RichEmbed()
            embed.setColor("#0fe22b");
            embed.setTitle("Space Cabbie");
            embed.setDescription("Bot Details");
            embed.addField("Uptime: ", uptime);
            embed.addField("Ping: ", client.ping+"ms");
            embed.addField("Status", "Alive");
            embed.setThumbnail("https://cdn.discordapp.com/avatars/667074896089579532/d8bc04cecf328a8f5516378e04d96e62.webp");
            embed.setFooter("Space Cabbie made by Edward", "https://cdn.discordapp.com/avatars/667074896089579532/d8bc04cecf328a8f5516378e04d96e62.webp");

            message.channel.send({embed});
        break;
    }
});

 
//client.mongoose.init();
client.login(token);
