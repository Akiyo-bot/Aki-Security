const Discord = require("discord.js");
const db = require('quick.db');

module.exports.run = async (client, message, args, data) => {

    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        var error_permissions = new Discord.RichEmbed()
            .setDescription("<:false:551460099600678944> Vous ne disposez pas les permissions nécessaires pour configur un message de bienvenue.")
            .setColor("#F43436")
        message.channel.send(error_permissions)
    }
    
    let antispam = db.get(`${message.guild.id}.config.protection.antispam`);

    if(!antispam == true) {
        
        db.set(`${message.guild.id}.config.protection.antispam`, true)

        message.channel.send('✅ **Anti spam activé avec succès**');
    } else if(antispam === true) {
        
        db.set(`${message.guild.id}.config.protection.antispam`, false)

        message.channel.send('✅ **Anti spam désactivé avec succès**');
    } else message.channel.send("Une err...")
}

module.exports.help = {
    name: "antispam",
    aliases: ["antispam", "anti-spam"],
    category: 'Protection',
    description: "Activer/Désactiver l'anti spam sur le serveur",
    usage: "",
    cooldown: 5,
    memberPerms: ["MANAGE_MESSAGES"],
    botPerms: ["MANAGE_MESSAGES"],
    args: false
}