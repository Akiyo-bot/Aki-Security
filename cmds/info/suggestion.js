const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let arg = message.content.split(" ").slice(1);
    let thingToEcho = arg.join(" ");
    if(!args[0]) return message.channel.send("<a:chargement_2:783052710437584907> Votre syntaxe est incorrecte. \n```Syntaxe : $suggest <Description>```")
    var suggest = new Discord.MessageEmbed()
        .setDescription("<a:ltProbleme:746800986349240350> | Nouvelle suggestion !")
        .addField("<:member:783031474471043082> __Auteur :__", "<@" + message.author.id + ">")
        .addField("📜 __Description :__", thingToEcho, true)
        .setColor("#FFD97C")
    client.channels.cache.get('858837437013688330').send(suggest)
    .then(function (message){
        message.react("<:true:881803555667849246>")
        message.react("<:false:881803557274255381>")
    }).catch(function(){

    });
    message.delete();
    message.channel.send("<:true:881803555667849246> Votre suggestion viens d'être envoyé sur le serveur principal.")
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