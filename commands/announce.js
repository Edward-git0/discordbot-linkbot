module.exports = {
    name: "announce",
    description: "Make announcements",
    category: "moderation",
    execute(message, args, Discord) {
        if (!message.author.id == "598513581033521152") {
            if (!message.member.hasPermission("MANAGE_MESSAGES"))
              return message.channel
                .send("You can't perform this command. ❌")
                .then(msg => {
                  msg.delete(5000);
                });
            }
        
            const sayMessage = args.join(" ");
            if (!sayMessage)
              return message.channel.send(
                "Please provide a message for your announcement! :x:"
              );
        
            const embed24 = new Discord.RichEmbed()
              .setFooter("Prompted by " + message.author.tag, message.author.avatarURL)
        
              .setDescription(sayMessage)
              .setColor("BLURPLE")
              .setTimestamp();
        
            let logs = message.guild.channels.find("name", "infraction-logs");
        
            let logsembed = new Discord.RichEmbed()
              .setTitle("Logs")
              .setColor("BLURPLE")
              .addField(
                `Announce`,
                `${message.author} announced a message in ${message.channel}! :white_check_mark:`
              )
              .setThumbnail(message.author.avatarURL)
              .setTimestamp()
              .setFooter(`User: ${message.author.username}`, message.author.avatarURL);
        
            message.channel.send(embed24).then(messages => logs.send(logsembed));
            message.delete(50).catch(console.error);
    }
}