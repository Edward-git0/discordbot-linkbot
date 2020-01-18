module.exports = {
    name: "Purge",
    description: "Removes messages",
    execute(message, args) {
        if (!message.member.hasPermission(["MANAGE_MESSAGES"])) {
            message.channel.send("You can't perform this command! :x:").then((msg) => {
                msg.delete(5000);
            });
        } else {
  
            const deleteCount = parseInt(args[0], 10);
        
            if (!deleteCount || deleteCount < 1 || deleteCount > 100) {
                message.reply(
                "Please provide a number between 2 and 100 for the number of messages to delete. :x:"
                );
            } else {
        
                const fetched = message.channel.fetchMessages({
                    limit: deleteCount + 1
                });
                let logs = message.guild.channels.find("name", "infraction-logs");
            
                let logsembed = new Discord.RichEmbed()
                    .setTitle("Logs")
                    .setColor("BLURPLE")
                    .addField(
                    `Purge`,
                    `${message.author} purged ${args[0]} messages in ${
                        message.channel
                    }! :white_check_mark:`
                    )
                    .setThumbnail(message.author.avatarURL)
                    .setTimestamp()
                    .setFooter(`User: ${message.author.username}`, message.author.avatarURL);
            
                message.channel.bulkDelete(fetched).then((messages) => {
                    logs.send(logsembed)
                });
            }
        }
    }
}