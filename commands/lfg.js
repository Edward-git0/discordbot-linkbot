const cooldowns = new Discord.Collection();
cooldowns.set("lfg", new Discord.Collection());

module.exports = {
    name: "lfg",
    description: "looking for group",
    category: "general",
    async execute(message, args, Discord) {
        let game = args.join(" ");
        if (!game) return message.channel.send("Specify a game! :x:")
        const now = Date.now();
        const timestamps = cooldowns.get('lfg');
        const cooldownAmount = (10) * 1000;

        if (timestamps.has(message.author.id)) {
            const embed4 = new Discord.RichEmbed()
            .setTitle("Cooldown")
            .setDescription("You can only send a LFG post once every 10 minutes!")
            .setColor("BLURPLE")
            .setTimestamp();
            return message.channel.send(embed4).then((msg)=>{msg.delete(2000)})
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        
        const lfg = new Discord.RichEmbed()
        .setTitle("Looking For Group")
        .addField(game, `${message.author.toString()} is looking for a group for ${game}!`)
        .setTimestamp()
        .setThumbnail(message.author.avatarURL)
        .setColor("BLURPLE")

        const embed2 = new Discord.RichEmbed()
        .setTitle("Looking for group")
        .setDescription("Post sent successfully")
        .setColor("BLURPLE")
        .setTimestamp();
        
        const m = await message.guild.channels.get("668131178900881428").send(lfg).then((msg) => { 
            message.delete();
            msg.react("👌");
            const filter = (reaction, user) => reaction.emoji.name === '👌' && user.id === message.author.id
            const collector = msg.createReactionCollector(filter);
            collector.on('collect', r => { 
                const embed3 = new Discord.RichEmbed()
                .setTitle("Looking For Group")
                .addField(game, `${message.author.toString()} found a group for ${game}!`)
                .setTimestamp()
                .setThumbnail(message.author.avatarURL)
                .setColor("BLURPLE")
                msg.edit(embed3);
             });
            message.channel.send(embed2).then((msg) => {
            msg.delete(1000);
        }) })
    }
}