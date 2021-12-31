const Discord = require('discord.js');

  
  module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("vous n'avez pas la permission pour cela.");
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Je n'ai pas la permission pour ça.");
  
    if (!message.channel.parentID) {
      message.channel.clone({ position: message.channel.rawPosition }).then((ch) => {
        let Sembed = new Discord.MessageEmbed()
        .setDescription("Channel nuked")
        .setImage('https://i.gifer.com/6Ip.gif')
        ch.send(Sembed).then((msg) => msg.delete({ timeout: 300000 }));
      });
    } else {
      message.channel.clone({ parent: message.channel.parentID, position: message.channel.rawPosition }).then((ch) => {
        let Sembed = new Discord.MessageEmbed()
        .setDescription("Channel nuked")
        .setImage('https://i.gifer.com/6Ip.gif')
        ch.send(Sembed).then((msg) => msg.delete({ timeout: 300000 }));
      });
    }
    message.channel.delete();
  };

  module.exports.help = {
    name: "nuke",
  };