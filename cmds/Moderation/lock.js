const Discord = require("discord.js");
const db = require('quick.db');

module.exports.run = async (client, message, args) => {
    if(!message.guild.me.permissionsIn(message.channel).has("MANAGE_CHANNELS")) return message.channel.send('⚠️ Je n\'ai pas les permissions de gérer ce salon.');

    if(!message.member.hasPermission("MANAGE_CHANNELS")) {
        var error_permissions = new Discord.MessageEmbed()
        .setDescription("<:false:881803557274255381> Vous ne disposez pas les permissions nécessaires pour lock ce channel.")
            .setColor("#F43436")
        return message.channel.send(error_permissions)
    }

    await message.channel.overwritePermissions([
        {
            id: message.guild.roles.everyone.id,
            deny: ["SEND_MESSAGES", "ADD_REACTIONS"]
        }
    ]).then(() => {
        message.channel.send(`✅ Le salon ${message.channel} a bien été fermé.`);  
    }).catch(err => {
        message.channel.send('Une erreur est survenue, veuillez réessayer. \n```' + err + '\n```');
    });
}

module.exports.help = {
    name: "lock",
    category: 'Moderation'
}