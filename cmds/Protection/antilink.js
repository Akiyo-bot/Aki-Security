const Discord = require("discord.js");
const db = require('quick.db');

module.exports.run = async (client, message, args, data) => {
    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        var error_permissions = new Discord.RichEmbed()
            .setDescription("<:false:551460099600678944> Vous ne disposez pas les permissions nécessaires pour configur un message de bienvenue.")
            .setColor("#F43436")
        message.channel.send(error_permissions)
    }

    
    let antilink = db.get(`${message.guild.id}.config.protection.antilink`);

    if(antilink === false || null) {
        
        db.set(`${message.guild.id}.config.protection.antilink`, true)

        message.channel.send('✅ **Anti lien activé avec succès**');
    } else if(antilink === true) {
        db.set(`${message.guild.id}.config.protection.antilink`, false);

        message.channel.send('✅ **Anti lien désactivé avec succès**');
    }
}

module.exports.help = {
    name: "antilink",
    aliases: ["antilink", "anti-link", "antilien", "anti-lien"],
    category: 'Protection',
    description: "Activer/Désactiver l'anti lien sur le serveur",
    usage: "",
    cooldown: 5,
    memberPerms: ["MANAGE_MESSAGES"],
    botPerms: ["MANAGE_MESSAGES"],
    args: false
}