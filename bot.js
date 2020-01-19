const fs = require('fs');
const ms = require('ms');
const request = require("request-promise-native");
const Discord = require('discord.js');
const client = new Discord.Client({ disableEveryone: true });
const { prefix, token, version, status } = require('./config.json');
//const db_url = 'mongodb+srv://pseudorandomness:UT2WYeH7HhRUzgUh@cluster0-uzi93.mongodb.net/test?retryWrites=true&w=majority';

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

/*
Client.on("guildMemberAdd", async member => {
    member.addRole("659833893263900715").then(() => {
       member.addRole("658847442992889867").then(() => {
         member.addRole("658847556335435808").then(() => {
           member.addRole("661242111211077632").then(() => {
             member.addRole("658750889904832573").then(() => {
               member.addRole("661242080374423562").then(() => {
                 member.addRole("661242059562287114").then(() => {
                   member.addRole("661242024569208854");
                 });
               });
             });
           });
         });
       });
     });
   
   if (member.bot) return;
 
   User.find({ id: member.id }, function(err, user) {
     if (user) {
       return;
     } else {
       var newUser = new User({ id: member.id });
       newUser.save(function(err, user) {
         if (err) console.log(err);
       });
     }
   });
 }); */

client.on('ready', () => {
    console.log("Update");
    client.channels.get('668131178900881428').send("<@338509501290250240>, I'm updated!");
});

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    //const LinkCoinsE = Client.emojis.get("661625944921997344");
    //const LinkGemsE = Client.emojis.get("661626800987963408");
  
    async function tenor(start, search, action, aloneaction) {
      try {
        var text = "";
        const user = message.mentions.users.first();
        if (search !== "crying" && search !== "shrug") {
          if (!user) {
            return message.reply("Mention a recipient! :x:");
          }
        }
        if (user == null || user.id == message.author.id || action == undefined) {
          text = aloneaction;
        } else {
          text = `<@${user.id}>, ${action} <@${message.author.id}>`;
        }
        var data = await request.get(
          `https://api.tenor.com/v1/search?q=${search}&key=LIVDSRZULELA&limit=25&media_filter=minimal&contentfilter=medium`
        );
        var gif = JSON.parse(data);
        const embed = new Discord.RichEmbed()
          .setColor("BLURPLE")
          .setDescription(text)
          .setImage(gif.results[Math.floor(Math.random() * 24)].media[0].gif.url);
        message.channel.send({ embed });
      } catch (err) {
        message.channel.send(String(err));
      }
    }
  
    async function gif(start, search, text) {
      try {
        var data = await request.get(
          `https://api.tenor.com/v1/search?q=${search}&key=LIVDSRZULELA&limit=25&media_filter=minimal&contentfilter=medium`
        );
        var gif = JSON.parse(data);
        const embed = new Discord.RichEmbed()
          .setColor("BLURPLE")
          .setDescription(text)
          .setImage(gif.results[Math.floor(Math.random() * 24)].media[0].gif.url);
        message.channel.send({ embed });
      } catch (err) {
        message.channel.send(String(err));
      }
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch(command) {
        case "ping":
            client.commands.get('ping').execute(message, client.ping);
        break;
        case "avatar":
            client.commands.get('avatar').execute(message, args, Discord);
        break;
        case "purge":
            client.commands.get('purge').execute(message, args, Discord);
        break;
        case "mute":
            client.commands.get('mute').execute(message, args, ms, Discord);
        break;
        case "ban":
            client.commands.get('ban').execute(message, args, ms, Discord);
        break;
        case "kick":
            client.commands.get('kick').execute(message, args, Discord);
        break;
        case "say":
            client.commands.get('say').execute(message, args);
        break;
        case "kill":
          client.commands.get('kill').execute(message, args);
        break;
        case "drown":
          client.commands.get('drown').execute(message, args, tenor);
        break;
        case "slap":
            client.commands.get('slap').execute(message, args, tenor);
        break;
        case "hug":
            client.commands.get('hug').execute(message, args, tenor);
        break;
        case "cuddle":
          client.commands.get('cuddle').execute(message, args, tenor);
        break;
        case "pat":
          client.commands.get('pat').execute(message, args, tenor);
        break;
        case "poke":
            client.commands.get('poke').execute(message, args, tenor);
        break;
        case "eval":
          client.commands.get('eval').execute(message, args);
        break;
        case "announce":
          client.commands.get('announce').execute(message, args, Discord);
        break;
        case "slowmode":
          client.commands.get('slowmode').execute(message, args, Discord);
        break;
        case "toggle":
          client.commands.get('toggle').execute(message, args, Discord);
        break;
        case "serverinfo":
          client.commands.get('serverinfo').execute(message, args, Discord);
        break;
        case "boxing":
          client.commands.get('boxing').execute(message, args);
        break;
        case "status": 
            message.channel.send(status); 
        break;
    }
});

 
//client.mongoose.init();
client.login(token);
