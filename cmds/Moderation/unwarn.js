const Discord = require('discord.js');

const db = require('quick.db');

module.exports = {
    name: "warn",
    description: "Warn a member",

    async run (client, message, args) {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`Vous n'avez pas les permission pour faire la commande unwarn`);

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.channel.send('Veuillez spécifier un utilisateur, par mention ou identifiant');

        if(user.bot) return message.channel.send('Vous ne pouvez pas unwarn les bots');

        if(message.author.id === user.id) return message.channel.send('Vous ne pouvez pas unwarn les bots, vous ne pouvez pas vous unwarn');

        if(message.guild.owner.id === user.id) return message.channel.send('Vous ne pouvez pas unwarn le propriétaire du serveur');

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'aucune raison';

        let warnings = db.get(`${message.guild.id}."${user.id}".warnings`);

        //if(warnings === 3) return user.kick();
        if(warnings <= 0) return message.channel.send(`${user} a aucun avertissements`);

        if(warnings === null) {
            db.set(`${message.guild.id}."${user.id}".warnings`, -1);
            user.send(`Vous avez été unwarn dans ${message.guild.name} pour la raison suivante: ${reason}`)
            await message.channel.send(`**${user.username}** a été unwarn`)
        }

        if(warnings !== null){
            db.add(`${message.guild.id}."${user.id}".warnings`, -1)
            user.send(`Vous avez été unwarn dans ${message.guild.name} pour la raison suivante: ${reason}, vous avez ${warnings} warn dans ce serveur`)
            await message.channel.send(`**${user.username}** a été unwarn, pour la raison : ${reason}`)
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