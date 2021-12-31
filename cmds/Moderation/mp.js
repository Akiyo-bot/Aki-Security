const Discord = require('discord.js');

exports.run = (client, message, args) => {
    
    if(!message.member.hasPermission("KICK_MEMBERS")) {
        var error_permissions = new Discord.MessageEmbed()
        .setDescription("<:false:881803557274255381> Vous ne disposez pas les permissions nécessaires pour effectuer cette commande.")
            .setColor("#F43436")
        return message.channel.send(error_permissions)
    }
    if(message.member.hasPermission("KICK_MEMBERS")) {
        const member = message.mentions.members.first();
        if(!member) return message.channel.send("<a:chargement_2:783052710437584907> Merci de mentionner un utilisateur pour envoyer un message privé depuis le bot.")
        let arg = message.content.split(" ").slice(2);
        let content_msg = arg.join(" ");
        if(!args[0]) return message.channel.send("<a:chargement_2:783052710437584907> Votre syntaxe est incorrecte. \n```Syntaxe : $!mp [Utilisateur] [Message]```");
        member.send(`:pushpin: | Vous avez reçu un message de **${authorauthorauthorauthorauthorauthor.tag}** depuis le serveur **${message.guild.name}** : **` + content_msg + `**`)
        message.channel.send(`<a:verif:722725514912989254> | Votre message privé a bien été envoyé à **${member.user.tag}** !`)
        message.delete();
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