module.exports = {
    name: "purge",
    description: "Removes messages",
    execute(message, args) {
        if (!message.member.hasPermission(["MANAGE_MESSAGES"])) {
            return message.channel
            .send("You can't perform this command! :x:")
            .then((msg) => {
                msg.delete(5000);
            });
        }
        if(!args.length) {
            return message.reply(
                "Please provide a number between 2 and 100 for the number of messages to delete. :x:"
            ); 
        }
        const deleteCount = parseInt(args[0], 10);
        if (!deleteCount || deleteCount < 1 || deleteCount > 100) {
            return message.reply(
            "Please provide a number between 2 and 100 for the number of messages to delete. :x:"
            );
      }
      message.channel.bulkDelete(deleteCount+1);
      message.reply("Purged "+deleteCount+" messages");
  /*
      const logsembed = new Discord.RichEmbed()
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
  
      message.channel.bulkDelete(deleteCount+1).then(() => { 
        client.channels.get('668131178900881428').send(logsembed);
         }) */
    },
}