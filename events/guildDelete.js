const { MessageEmbed } = require("discord.js");
const db = require('quick.db');
const discord = require("discord.js");
const moment = require("moment");

module.exports = async (client, guild) => {
    db.delete(`${guild.id}.config.prefix`, '$')

    const newGuildEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setDescription(`J'ai quitter le serveur **${guild.name}** !\nJe suis maintenant dans **` + client.guilds.cache.size + `** serveurs !`)
        client.users.cache.get("770651879838449665").send(newGuildEmbed);
}