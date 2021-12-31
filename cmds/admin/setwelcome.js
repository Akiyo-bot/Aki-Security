const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "setwelcome",
  category: "moderation",
  usage: "setwelcome <#channel>",
  description: "Set the welcome channel",
  run: (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Vous n'avez pas les permission pour configurer les message de bienvenue !`);
    
    let channel = message.mentions.channels.first()
    
    if(!channel) {
      return message.channel.send("Veuillez d'abord mentionner la chaîne")
    }
    
    //Now we gonna use quick.db
    
    db.set(`welchannel_${message.guild.id}`, channel.id)
    
    message.channel.send(`Channel de bienvenue est défini dans ${channel}`)
  }
}