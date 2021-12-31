//FAIT
const Discord = require("discord.js");

 
module.exports.run = async (bot, message, args) => {
 
    if(args[0] == "help") return message.channel.send(`Just do ${prefix} help instead`)
   
    if(args[0]) {
        let command = args[0];
        if(bot.commands.has(command)) {
        command = bot.commands.get(command)
        var SHembed = new Discord.MessageEmbed()
        .setColor(colours.green_dark)
        .setAuthor(`BlackMagpie's`)
        .setThumbnail(bot.user.displayAvatarURL)
        .setDescription(`Le préfix du bot est : \`$\`\n\n`)
        message.channel.send(SHembed);
    }}
 
    if(!args[0]) {

 
        let Sembed = new Discord.MessageEmbed()
        .setColor("#0cc01c")
        .setAuthor(`BlackMagpie's | invites !`, message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription(" voici le lien pour m’inviter, cliquer [ici](https://discord.com/oauth2/authorize?client_id=880421534898987028&scope=bot&permissions=2146958847)")
        .setFooter("BlackMagpie's | Surveille " + bot.users.cache.size + " membres", bot.user.displayAvatarURL())
        message.channel.send(Sembed)
    }
   
}
 
module.exports.help = {
    name: "bvn",
    category: "info",
    description: "Commande permtant d'achiffer toute les commande de BlackMagpie's !\nUtilisation : ```$help```",
    cooldown: 3,
    usage: '<commande_name>',
    isUerAdmin: false,
    permission: false,
    args: false
}