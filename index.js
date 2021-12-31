const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
const moment = require("moment")
const snekfetch = require('snekfetch')
const fetch = require('node-fetch');
const request = require('request');
const generator = require('generate-password');
const { inspect } = require('util');
const superfetch = require('node-superfetch')
const ms = require('ms')
let cpuStat = require("cpu-stat");
let os = require('os');
const db = require("quick.db")
var old_msg = []


client.commands = new Discord.Collection();

client.login(config.token);


fs.readdir('./cmds/', (err, content) => {
    if(err) console.log(err);
    if(content.length < 1) return console.log('Veuillez créer des dossiers dans le dossier commands !');
    var groups = [];
    content.forEach(element => {
        if(!element.includes('.')) groups.push(element); // Si c'est un dossier
    });
    groups.forEach(folder => {
        fs.readdir("./cmds/"+folder, (e, files) => {
            let js_files = files.filter(f => f.split(".").pop() === "js");
            if(js_files.length < 1) return console.log('Veuillez créer des fichiers dans le dossier "'+folder+'" !');
            if(e) console.log(e);
            js_files.forEach(element => {
                let props = require('./cmds/'+folder+'/'+element);
                client.commands.set(element.split('.')[0], props);
            });
        });
    });
  });


fs.readdir("./events/", (error, f) => {
    if (error) console.log(error);
    console.log(`${f.length} event(s) en chargement(s)`);

    f.forEach((f) => {
        const events = require(`./events/${f}`);
        const event = f.split(".")[0];

        client.on(event, events.bind(null, client));
    });
});


client.on('message', async (message) => {

  if (message.content === 'cmd') {

      if (message.author.id === "770651879838449665") {
          message.delete();
          if (message.content.toLowerCase() === 'cmd') {
              const embed = new Discord.MessageEmbed()
                  .addFields({
                      name: "Bienvenue sur le Discord Aki'Home!",
                      value: "Voici toutes les règles et informations de base pour notre serveur ! \n Invitez d'autres personnes pour plus de membres!",
                      inline: true
                  })
              message.channel.send(embed);
          };
          
          if (message.content.toLowerCase() === 'cmd') {
              const embed = new Discord.MessageEmbed()
                  .addFields({
                      name: "Je suis nouveau ici. Que puis-je faire ?",
                      value: "Tester <@880421534898987028> ! Consultez <#923877094327472189> Afficher ces fonctionnalité !",
                      inline: true
                  })
                  .addFields({
                      name: "Je crée du contenu - puis-je le montrer?",
                      value: "Nous n'autorisons pas l'auto-promotion. Si vous êtes développeur, envoyez-nous un message en message privé !.",
                      inline: true
                  })
              message.channel.send(embed);
          };

          if (message.content.toLowerCase() === 'cmd') {
              const embed = new Discord.MessageEmbed()
                  .setTitle('Ce règlement va aussi appliquer la charte d’utilisation de la communauté Discord')
                  .setURL('https://support.discord.com/hc/fr/articles/360035969312-Lignes-de-Conduite-des-Serveurs-Publics')
                  .setAuthor('Règlement')
                  .setDescription("Si ce règlement n'est pas respecter vous gagnerez un ban du serveur ou si nécessaire un raport a Discord")
                  .addFields({
                      name: "Les règles",
                      value: "1. Soyez responsable. Ne soyez pas impoli ou immature. \n2. Aucun contenu NSFW. \n3. Aucun commentaire grossier, offensant, haineux ou désobligeant. \n4. Pas de spam ni de promotion, ni de lien avec d'autres discordes. \n5. Pas de mendicité d'argent / de produits / d'autres biens ou services. \n6. Aucun piratage ou fuite de documents confidentiels / internes. \n7. Ne cinglez pas les rôles inutilement. \n8. Tous les noms d'utilisateur doivent être entièrement étiquetables à l'aide d'un clavier français. \n9. Strictement aucune discussion approfondie sur la religion, la politique ou d'autres sujets sensibles. La discussion politique en matière de technologie est autorisée. \n11. N'enregistrez pas de canaux vocaux. \n_La sanction et l'application des règles sont à la discrétion du modérateur._",
                      image: 'https://i.imgur.com/qoihhbW.png',
                      inline: true
                  })
              message.channel.send(embed);
          };
      } else {
          message.reply("Tu n'a pas la permition !")
      } return
  }
});

