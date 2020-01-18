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

      const logsembed = new Discord.RichEmbed()
      .setTitle("Logs")
      .setColor("BLURPLE")
      .addField("Purge", message.author+" purged "+deleteCount+" messages in "+message.channel+"! :white_check_mark:")
      .setThumbnail(message.author.avatarURL)
      .setTimestamp()
      .setFooter(`User: ${message.author.username}`, message.author.avatarURL);

      client.channels.get("668197255366574132").send('logsembed');
      message.channel.bulkDelete(deleteCount+1);

    },
}