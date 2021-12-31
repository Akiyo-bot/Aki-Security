const Discord = require('discord.js');

var now = new Date();
var hour = now.getHours();
var minute = now.getMinutes();
var second = now.getSeconds();
var times = (`[${hour}:${minute}:${second}]/`);

var nb_caract = "nd";
var nombres = "nd";
var symboles = "nd";

exports.run = (client, message, args) => {
    let arg = message.content.split(" ").slice(2);
    let member = message.mentions.members.first();
    const achannel = client.channels.cache.get('785609721486376981')
    if (message.author.id != "560342502146834432") {
        var error_permissions = new Discord.MessageEmbed()
            .setDescription("<a:chargement_2:783052710437584907> Vous n'avez pas les autorisations pour faire cela!")
            .setColor("#F43436")
        message.channel.send(error_permissions)
    }
    if (!message.author.id != "560342502146834432") {

        let content_msg = arg.join(" ");
        var suggest = new Discord.MessageEmbed()
            .setDescription("<a:ltProbleme:746800986349240350> | Information !")
            .addField("<:member:783031474471043082>", "<@" + member + "> " + content_msg)
            .setColor("#FFD97C")
    
        if (!member) return message.channel.send("<a:chargement_2:783052710437584907> Merci de mentionner un utilisateur pour envoyer un rapport.")
        let args = message.content.split(" ").slice(2);
        if (!args[0]) return message.channel.send("<a:chargement_2:783052710437584907> Votre syntaxe est incorrecte. \n```Syntaxe : $info-equipe [Utilisateur] [Message]```");

        
        achannel.send(suggest)
        message.channel.send(`<a:verif:722725514912989254> | Votre message  a bien été envoyé, pour **${member.user}** !`);
        achannel.send("<@" + member + "> ").then(msg => {
            msg.delete({timeout: 500});
        })
    }
}


//client.channels.cache.get('770565758090608660').send(suggest)