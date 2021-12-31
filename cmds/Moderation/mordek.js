const Discord = require('discord.js');

module.exports.run = async (client, message, args, content) => {

let muteRole = message.guild.roles.cache.find(role => role.name == "everyone")
        const channels = message.guild.channels.cache.filter(ch => ch.type !== "category")
        
        message.guild.channels.forEach(ch => 
            {
              
            if(ch.type == "text")
              ch.overwritePermissions([
              {
                 id: muteRole.id,
                 deny: ['SEND_MESSAGES'],
              },
            ], 'Needed to change permissions');
            }) 
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
            