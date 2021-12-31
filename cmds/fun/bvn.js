const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let messageArgs = message.content.split(" ");
    const user = (message.mentions.members.first()) ? message.mentions.members.first().user.id : messageArgs[1].match(/[0-9]+/)[0];

    if (!user) return message.channel.send("<a:chargement_2:783052710437584907>  Merci de mentionner un utilisateur pour souhaiter la bienvenue.")
    message.channel.send(`${message.author} vous souhaite bienvenue **<@${user}>** <a:hey:772062410499555348> !`)
    message.delete();
}

module.exports.help = {
    name: "bvn",
    category: "info",
    description: "Commande permtant d'achiffer toute les commande de BM'Security !\nUtilisation : ```$help```",
    cooldown: 3,
    usage: '<commande_name>',
    isUerAdmin: false,
    permission: false,
    args: false
}