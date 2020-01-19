module.exports = {
    name: "lfg",
    description: "looking for group",
    category: "general",
    async execute(message, args, Discord) {
        let game = args.join(" ");
        if (!game) return message.channel.send("Specify a game! :x:")
        
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
            msg.react("👌").then((reaction) => {
                // Create a reaction collector
                const filter = (reaction, user) => reaction.emoji.name === '👌' && user.id === message.author.id
                message.awaitReactions(filter)
                .then(collected => console.log(`Collected ${collected.size} reactions`))
                .catch(console.error);
            }); 
            message.channel.send(embed2).then((msg) => {
            msg.delete(1000);
        }) })
    }
}