const Discord = require('discord.js');

const db = require('quick.db');
module.exports.run = (client, message) => {

	let Sembed = new Discord.MessageEmbed()
            .setColor("#0000FF")
            .setAuthor(`BM'Security | variables !`, message.guild.iconURL)
          .addFields({
            name: '__Variables messages de bienvenue__',
            value: '**{user}** ➔ Mentionner le membre \n**{username}** ➔ Nom d\'utilisateur du membre \n**{usertag}** ➔ Tag (nom d\'utilisateur + discriminateur) du membre \n**{guildName}** ➔ Nom du serveur \n**{memberCount}** ➔ Nombre de membres sur le serveur \n**{usercreat}** ➔ Compte créé il y a combien de temps ?\n**{userinvite}** ➔ Invité pas qui ?',
        }, {
          name: '__Variables messages de au revoir__',
          value: '**{user}** ➔ Mentionner le membre \n**{username}** ➔ Nom d\'utilisateur du membre \n**{usertag}** ➔ Tag (nom d\'utilisateur + discriminateur) du membre \n**{guildName}** ➔ Nom du serveur \n**{memberCount}** ➔ Nombre de membres sur le serveur ',
      }, {
          name: 'BM\'Security est en cour de création donc si vous voyez une erreur ou une faute vous pouzez nous le faire savoir avec la commande `$suggestion`',
        }, )
          
            .setTimestamp()
            .setDescription(" BM'Security | Surveille " + client.guilds.cache.size + " serveur",client.user.displayAvatarURL())
            message.channel.send(Sembed)
}

module.exports.help = {
    name: "variables",
    aliases: ["variables", "variable", "var", "vars"],
    category: 'Config',
    description: "Voir les variables disponibles pour le message de bienvenue et d'aurevoir",
    usage: "",
    cooldown: 5,
    memberPerms: [],
    botPerms: ["EMBED_LINKS"],
    args: false
}