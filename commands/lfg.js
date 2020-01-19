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
        
        const m = await message.guild.channels.get("668131178900881428").send(lfg);
    }
}