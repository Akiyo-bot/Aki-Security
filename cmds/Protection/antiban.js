const Discord = require("discord.js");
const db = require('quick.db');

module.exports.run = async (client, message, args, data) => {

    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        var error_permissions = new Discord.RichEmbed()
            .setDescription("<:false:551460099600678944> Vous ne disposez pas les permissions nécessaires pour configur un message de bienvenue.")
            .setColor("#F43436")
        message.channel.send(error_permissions)
    }

    
    let antisban = db.get(`${message.guild.id}.config.protection.antisban`);

    if(!antisban == false || null) {

        db.set(`${message.guild.id}.config.protection.antisban`, true)

        message.channel.send('✅ **Antiban activé avec succès**');
    } else if(antisban === true) {
        db.set(`${message.guild.id}.config.protection.antisban`, false)

        message.channel.send('✅ **Antiban désactivé avec succès**');
    }
}

module.exports.help = {
    name: "antiban",
    aliases: ["antiban", "anti-ban"],
    category: 'Protection',
    description: "Activer/Désactiver l'antiban sur le serveur",
    usage: "",
    cooldown: 5,
    memberPerms: ["BAN_MEMBERS"],
    botPerms: ["BAN_MEMBERS"],
    args: false
}