const Discord = require("discord.js");

 
module.exports.run = async (bot, message, args) => {
 
    if(!args[0]) {

 
        const msg = await message.channel.send("Ping?");
  msg.edit(`Pong! La latence est de ${msg.createdTimestamp - message.createdTimestamp}ms. La latence de l'API est de ${Math.round(bot.ws.ping)}ms`);
};
   
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