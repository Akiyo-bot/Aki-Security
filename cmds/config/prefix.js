const Discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async (client, message, args, content) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) {
        var error_permissions = new Discord.MessageEmbed()
            .setDescription("<:false:881803557274255381> Vous ne disposez pas les permissions nécessaires pour configur un nouveaux prefix.")
            .setColor("#F43436")
        return message.channel.send(error_permissions)
    }

    let arg = message.content.split(" ").slice(1);
    let thingToEcho = arg.join(" ");
    let prefix = db.get(`${message.guild.id}.config.prefix`);
    if(!args[0]) return message.channel.send("<a:chargement_2:783052710437584907> Votre syntaxe est incorrecte. \n```Syntaxe : $prefix <new_prefix>```")

    if(prefix === null) return db.set(`${message.guild.id}.config.prefix`, '$')

    if(prefix !== null){
        db.set(`${message.guild.id}.config.prefix`, thingToEcho)

        var embed = new Discord.MessageEmbed()
        .setDescription("<a:ltProbleme:746800986349240350> | Nouvelle configuration !")
        .addField("<:member:783031474471043082> __Auteur :__", "<@" + message.author.id + ">")
        .addField("📜 __Changement du prefix :__", thingToEcho, true)
        .setColor("#FFD97C")
    message.channel.send(embed)
    }

}

module.exports.help = {
    name: "prefix",
    category: "configuration",
    description: "Commande permtant d'achiffer configurer leprefix de BM'Securityi !\nUtilisation : ```$prefix```",
    cooldown: 3,
    usage: '<commande_name> <new_prefix>',
    isUerAdmin: false,
    permission: false,
    args: false
}
