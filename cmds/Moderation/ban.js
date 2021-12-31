const Discord = require('discord.js');
const { arch } = require('os');
const db = require('quick.db');


exports.run = (client, message, args) => {

    const member = message.mentions.members.first();

    let thingToEchodb = db.get(`${message.guild.id}.${member.user.id}.ban`);

    

    if(!message.member.hasPermission("BAN_MEMBERS")) {
        var error_permissions = new Discord.MessageEmbed()
        .setDescription("<:false:881803557274255381> Vous ne disposez pas les permissions nécessaires pour bannir un utilisateur.")
            .setColor("#F43436")
        return message.channel.send(error_permissions)
    }
    
    if (message.member.hasPermission("BAN_MEMBERS")) {
        let reason = args.slice(1).join(" ");

        if (reason === undefined) {
            reason = 'Non specifier...';
        } else reason = reason
        
        db.set(`${message.guild.id}.${member.user.id}.ban`, reason)


        if (!member) return message.channel.send("<:false:881803557274255381> Merci de mentionner un utilisateur pour bannir.")
        member.send(`<:true:881803555667849246> Vous étes désormais banni du serveur ${message.guild.name}. Pour la raison ${reason}`).catch(console.error)
            .then(console.log('ok'));
        member.ban()
       message.channel.send(`<:true:881803555667849246> L'utilisateur **${member.user.tag}** est désormais banni du serveur. Pour la raison ${reason}`).catch(console.error);
       }
    message.delete();
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