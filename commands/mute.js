module.exports = {
    name: "mute",
    description: "Mute a user",
    execute(message, args) {
        if (!message.member.hasPermission(["MANAGE_MESSAGES"]))
        return message.channel.send("You can't perform this command. ❌");
      let user = message.mentions.users.first();
      let time = args[1];
      let reason = args.splice(2, args.length).join(" ");
      if (!time)
        return message.channel.send(
          "Specify a time! :x: `,mute {user} {time} {reason}`"
        );
      if (!reason)
        return message.channel.send(
          "Specify a reason! :x: `,mute {user} {time} {reason}`"
        );
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          member.addRole("660311773613654019").then(() => {
            message.channel.send(
              `**Successfully muted ${user.tag}` + " for " + ms(ms(time)) + ".**"
            );
            user.send(
              "**You were muted in LinkCord because:** \n```\n" +
                reason +
                "\n``` \n`By: " +
                message.author.tag +
                "`"
            );
            setTimeout(function() {
              member.removeRole("660311773613654019");
              user.send("**You were unmuted in LinkCord! :tada:**");
              message.channel.send(`**${user.tag} has been unmuted!**`);
            }, ms(time));
          });
        } else {
          message.channel.send("Couldn't find that user! :x:");
        }
      } else {
        message.channel.send(
          "Specify a user! :x: `,mute {user} {time} {reason}`"
        );
      }
    }
}