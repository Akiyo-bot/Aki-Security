const Discord = require('discord.js');
const db = require('quick.db');
const moment = require("moment");

exports.run = (client, message, args) => {
   
    if(message.mentions.users.first() || message.guild.members.cache.get(args[0])) {
        user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
   } else{
        user = message.author;
    }

    if(user.bot) return message.channel.send('Vous ne pouvez pas voir les bots');

    
    let lvl = db.get(`${user}.lvl`);
    let number = db.get(`${user}.number`);
    lvl = parseInt(lvl, 10);
    let niveaux = lvl / number
    let dateCreation = message.member.user.createdAt;
    const member = message.guild.member(user);


    if (isNaN(niveaux)) {
        reniveaux = `n'a pas encore été note, il ne peux donc avoir de note`
    } else reniveaux = `a un niveaux de ${niveaux}/5, il a été noté ${number} fois`



    let userActivity = user.presence.activities[0];
    let toDisplay = "";
    if(userActivity) {
        if(userActivity.name !== "Custom Status") {
            switch (userActivity.type) {
                case "PLAYING": toDisplay = 'Joue à '; break;
                case "LISTENING": toDisplay = 'Écoute '; break;
                case "WATCHING": toDisplay = 'Regarde '; break;
                case "COMPETING": toDisplay = 'Participant à: '; break;
                case "STREAMING": toDisplay = 'Streame '; break;
            };

            toDisplay+= userActivity.name;
        } else {
            toDisplay = `${userActivity.emoji ? userActivity.emoji : ""} ${userActivity.state ? userActivity.state : ""}`
        }
    }


    let userStatus = user.presence.status;
    switch (userStatus) {
      	case "online": {
        	userStatus = `<:online:882507047973814293> En ligne`;
        	break;
      	};
      	case "offline": {
        	userStatus = `<:offline:882507048158396476> Hors-ligne`;
        	break;
      	};
      	case "idle": {
        	userStatus = `<:idle:882507048238071838> Inactif`;
        	break;
      	};
      	case "dnd": {
        	userStatus = `<:dnd:882507048078704670> Ne pas déranger`;
        	break;
      	};
    };






    var infobot = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setColor('#ff5555')
        .setThumbnail(user.avatarURL)
        .addField(`Information sur`, user, `:`, true)
        .addField('ID du compte:', `${user.id}`, true)
        .addField('Pseudo sur le serveur :', `${member.nickname ? member.nickname : 'Aucun'}`, true)
        .addField('A crée son compte le :', `${moment(user.createdAt).locale('fr').format('llll')}`, true)
        .addField('A rejoint le serveur le :', `${moment.utc(member.joinedAt).locale('fr').format('llll')}`, true)
        .addField('Status:', `${userStatus}`, true)
        .addField('Activité :', `${toDisplay.length > 1 ? toDisplay : "Aucune activité en cours"}`, true)
        .addField('Roles :', member.roles.cache.map(roles => `${roles.name}`).join(', '), true)
        .addField(`En réponse a :`,`${message.author.username}#${message.author.discriminator}`)
        .setDescription(`${user} ${reniveaux}`)
        .setColor("#2A2A32")
        .setTimestamp()
        .setFooter("BlackMagpie's", client.user.displayAvatarURL)
    message.channel.send(infobot)
}

module.exports.help = {
    name: "bvn",
    category: "info",
    description: "Commande permtant d'achiffer toute les commande de BlackMagpie's !\nUtilisation : ```$help```",
    cooldown: 3,
    usage: '<commande_name>',
    isUerAdmin: false,
    permission: false,
    args: false
}