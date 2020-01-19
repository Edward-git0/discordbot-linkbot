module.exports = {
    name: "giveaway",
    description: "Free things!",
    category: "fun",
    async execute(message, args, Discord, ms) {
        // yes someone literally copied a dutch youtubers video lmfao ===================================== smh dont kill me pls
        var item = "";
        var time = 0;
        var winners;

        if (!message.member.hasPermission(["MANAGE_MESSAGES"]))
        return message.channel.send("You can't perform this command! :x:");

        winners = args[0];
        time = args[1];
        item = args.splice(2, args.length).join(" ");

        if (!item)
        return message.channel.send(
            "Provide a reward! :x: `,giveaway {amount of winners} {time} {reward}`"
        );
        if (!time)
        return message.channel.send(
            "Provide a time! :x: `,giveaway {amount of winners} {time} {reward}`"
        );
        if (!winners)
        return message.channel.send(
            "Provide a valid amount of winners! `,giveaway {amount of winners} {time} {reward}`"
        );

        message.delete();

        const giveembed = new Discord.RichEmbed()
        .setTitle("🎉 LinkCord Giveaway 🎉")
        .addField("Reward:", item)
        .addField("Duration:", ms(ms(time)))
        .setColor("BLURPLE")
        .setFooter(`${winners} Winners!`)
        .setTimestamp();

        
        for(const role of message.channel.guild.roles) {
            message.channel.send(role);
        }

        message.channel.send("<@509243841887469581>");
        let msgsent = message.channel.send(giveembed).then((msg) => {
            msg.react("🎉");
        })

        setTimeout(function() {
        var random = 0;
        var winner = [];
        var inlist = false;

        var people = msgsent.reactions.get("🎉").users.array();

        for (let i = 0; i < people.length; i++) {
            if (people[i].id === Client.user.id) {
            people.splice(i, 1);
            continue;
            }
        }

        if (people.length == 0) {
            return message.channel.send(
            "**No winners since nobody reacted. :pensive:**"
            );
        }

        if (people.length < winners) {
            return message.channel.send(
            "**Not enough reactions to have all " +
                winners +
                " winners. :pensive:**"
            );
        }

        for (let i = 0; i < winners; i++) {
            inlist = false;
            random = Math.floor(Math.random() * people.length);

            for (let y = 0; y < winner.length; y++) {
            if (winner[y] == people[random]) {
                inlist = true;
                i--;
                break;
            }
            }
            if (!inlist) {
            winner.push(people[random]);
            }
        }

        for (let i = 0; i < winner.length; i++) {
            message.channel.send(":tada: **" + winner[i] + `won ${item}!** :tada:`);
        }
        }, ms(time));
    }
}