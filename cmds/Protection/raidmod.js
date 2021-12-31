
const Discord = require('discord.js');
const db = require('quick.db');
module.exports.run = async (client, message, args) => {
    
    let prefix = db.get(`${guild.id}.config.prefix`)
    let raidmod = db.get(`${message.guild.id}.config.raidmod`);
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        var error_permissions = new Discord.MessageEmbed()
            .setDescription("<:false:881803557274255381> Vous ne disposez pas les permissions nécessaires pour activé le raidmod")
            .setColor("#F43436")
        return message.channel.send(error_permissions)
    }


    if(raidmod === false || null) {
        db.set(`${message.guild.id}.config.raidmod`, true)

        message.channel.send('✅ **Raidmode activé avec succès**');
        message.guild.owner.send('✅ **Le Raidmode a été activé sur' + message.guild.name + '. il a été activé par <@' + message.author + '> !**, faites' + prefix + 'raidmod pour le désactivé')

    } 
    if(raidmod === true) {
        db.set(`${message.guild.id}.config.raidmod`, false)

        message.channel.send('✅ **Raidmode désactivé avec succès**');
    }
}

module.exports.help = {
    name: "raidmode",
    aliases: ["raidmode", "raidmod"],
    category: 'Protection',
    description: "Activer/Désactiver le mode raid sur le serveur",
    usage: "",
    cooldown: 5,
    memberPerms: ["KICK_MEMBERS"],
    botPerms: ["KICK_MEMBERS"],
    args: false
}