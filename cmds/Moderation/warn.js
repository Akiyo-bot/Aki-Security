const Discord = require('discord.js');

const db = require('quick.db');

module.exports = {
    name: "warn",
    description: "Warn a member",

    async run (client, message, args) {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`Vous n'avez pas les permission pour faire la commande warn`);

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.channel.send('Veuillez spécifier un utilisateur, par mention ou identifiant');

        if(user.bot) return message.channel.send('Vous ne pouvez pas avertir les bots');

        if(message.author.id === user.id) return message.channel.send('Vous ne pouvez pas avertir les bots, vous ne pouvez pas vous prévenir warn');

        if(message.guild.owner.id === user.id) return message.channel.send('Vous ne pouvez pas avertir le propriétaire du serveur');

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'aucune raison';

        let warnings = db.get(`${message.guild.id}.${user.id}.warnings`);

        //if(warnings === 3) return user.kick();
        if(warnings === 3) return message.channel.send(`${user} a déjà atteint trois avertissements, ` + "si vous souhaiter faire une action, vous pouvez voir les action possible avec ```$help moderation```");


        if (isNaN(warnings)) {
            db.set(`${message.guild.id}."${user}".warnings`, 1);
            user.send(`Vous avez été averti dans ${message.guild.name} pour la raison suivante: ${reason}`)
            await message.channel.send(`**${user.username}** a été averti, pour la raison : ${reason}, il a actuellement 1 warnings`)
        } else {
            db.add(`${message.guild.id}."${user}".warnings`, 1)
            user.send(`Vous avez été averti dans ${message.guild.name} pour la raison suivante: ${reason}, vous avez ${warnings + 1} warn dans ce serveur`)
            await message.channel.send(`**${user.username}** a été averti, pour la raison : ${reason}, il a actuellement ${warnings + 1} warnings`)
        }
    }
}

module.exports.help = {
    name: "warn",
    category: "Moderation",
    description: "Commande permtant de avertire un utilisateur ( l'utilisateur a le drois qu'a 3 warn\nUtilisation : ```$help```",
    cooldown: 3,
    usage: '<commande_name>',
    isUerAdmin: false,
    permission: false,
    args: false
}