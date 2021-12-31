const Discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async (client, message, args, content) => {

    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if(warnings === 0) return message.channel.send(`${user} a aucun avertissements, continuez comme ça !`);

    if(warnings !== null){
        await message.channel.send(`**${user.username}** vous avez actuellement ${warnings} warnings`)
    }
}

module.exports.help = {
    name: "mewarn",
    category: "info",
    description: "Commande permtant d'achiffer le nombre de warn que vous avez !\nUtilisation : ```$newarn```",
    cooldown: 3,
    usage: '<commande_name>',
    isUerAdmin: false,
    permission: false,
    args: false
}
