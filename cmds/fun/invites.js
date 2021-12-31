//FAIT
const Discord = require("discord.js");

 
module.exports.run = async (bot, message, args) => {
 
    if(!args[0]) {

 
        let Sembed = new Discord.MessageEmbed()
        .setColor("#0cc01c")
        .setAuthor(`BlackMagpie's | Invites moi sur ton serveur !`, message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription(`Merci d'utiliser BlackMagpie's vous pouvez appuier [ici](https://discord.com/oauth2/authorize?client_id=771427393957003284&scope=bot&permissions=256) pour m'inviter`)
        .setFooter("BlackMagpie's | Vous Surveille pour votre securiter", bot.user.displayAvatarURL)
        message.channel.send(Sembed)
    }
   
}
 
module.exports.help = {
    name: "bvn",
    category: "info",
    description: "Commande permtant d'achiffer toute les commande de siri !\nUtilisation : ```$help```",
    cooldown: 3,
    usage: '<commande_name>',
    isUerAdmin: false,
    permission: false,
    args: false
}

