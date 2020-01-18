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

      const logs = message.guild.channels.find("name", "infraction-logs");
/*      let logsembed = new Discord.RichEmbed()
      .setTitle("Logs")
      .setColor("BLURPLE")
      .addField("Purge", "purge") //message.author+" purged "+deleteCount+" messages in "+message.channel+"! :white_check_mark:")
      .setTimestamp() */

      const exampleEmbed = new Discord.RichEmbed()
	.setColor('#0099ff')
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/wSTFkRM.png')
	.addField('Regular field title', 'Some value here')
	.addBlankField()
	.addField('Inline field title', 'Some value here', true)
	.addField('Inline field title', 'Some value here', true)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()
	.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');


      message.channel.bulkDelete(deleteCount+1).then((messages) => logs.send(exampleEmbed))

    },
}