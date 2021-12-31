const Discord = require('discord.js');
const request = require('request');

var now = new Date();
var hour = now.getHours();
var minute = now.getMinutes();
var second = now.getSeconds();
var times = (`[${hour}:${minute}:${second}]/`);

exports.run = (client, message, args) => {

  let result = Math.floor(Math.random() * 115);

  let url = "https://bridge.buddyweb.fr/api/blagues/blagues/"+result

  request(url, function(err, res, body) {
      let json = JSON.parse(body);

     message.channel.send("```"+json.blagues+"```");
  });

}

module.exports.help = {
    name:"blague"
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