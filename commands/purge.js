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
      message.channel.send(message.author+" has deleted "+deletedCount+" messages!");
    },
}