const { MessageEmbed } = require("discord.js");
const db = require('quick.db');
const discord = require("discord.js");
const moment = require("moment");

module.exports = async (client, guild) => {
    let prefix = db.get(`${guild.id}.config.prefix`)
    

    db.set(`${guild.id}.config.prefix`, '$')
            
    db.set(`${guild.id}.config.protection.antisban`, false)
    db.set(`${guild.id}.config.protection.antispam`, false)
    db.set(`${guild.id}.config.protection.antilink`, false);    
    db.set(`${guild.id}.config.raidmod`, false)
    
    db.set(`${guild.id}.config.welcome.enabled`, false)
    db.set(`${guild.id}.config.welcome.channels`, false)
    db.set(`${guild.id}.config.config.welcome.message`, false)
    db.set(`${guild.id}.config.welcome.image`, false)

    db.set(`${guild.id}.config.goodbye.enabled`, false)
    db.set(`${guild.id}.config.goodbye.channels`, false)
    db.set(`${guild.id}.config.goodbye.message`, false)
    db.set(`${guild.id}.config.goodbye.image`, false)

    db.set(`${guild.id}.config.log.enabled`, false)
    db.set(`${guild.id}.config.log.channels`, false)

    db.set(`${guild.id}.config.autorole.role`, false)
    db.set(`${guild.id}.config.autorole.enabled`, false)

    db.set(`${guild.id}.config.protection.ignored_roles`, false)
    db.set(`${guild.id}.config.protection.ignored_channels`, false)

    db.set(`${guild.id}.config.muterole`, false)



    if(prefix === null) db.set(`${guild.id}.config.prefix`, '$')
    
    let muterolefetch = guild.roles.cache.find(r => r.name === "mute")

    let muterole = db.get(`${guild.id}.config.muterole`);

    if(muterole) {
        db.set(`${guild.id}.config.muterole`, muterolefetch.id)
    }






    db.set(`${guild.id}.config.prefix`, '$')
            
    db.set(`${guild.id}.config.protection.antisban`, false)
    db.set(`${guild.id}.config.protection.antispam`, false)
    db.set(`${guild.id}.config.protection.antilink`, false);    
    db.set(`${guild.id}.config.raidmod`, false)
    
    db.set(`${guild.id}.config.welcome.enabled`, false)
    db.set(`${guild.id}.config.welcome.channels`, false)
    db.set(`${guild.id}.config.config.welcome.message`, false)
    db.set(`${guild.id}.config.welcome.image`, false)

    db.set(`${guild.id}.config.goodbye.enabled`, false)
    db.set(`${guild.id}.config.goodbye.channels`, false)
    db.set(`${guild.id}.config.goodbye.message`, false)
    db.set(`${guild.id}.config.goodbye.image`, false)

    db.set(`${guild.id}.config.log.enabled`, false)
    db.set(`${guild.id}.config.log.channels`, false)

    db.set(`${guild.id}.config.autorole.role`, false)
    db.set(`${guild.id}.config.autorole.enabled`, false)

    db.set(`${guild.id}.config.protection.ignored_roles`, false)
    db.set(`${guild.id}.config.protection.ignored_channels`, false)

    db.set(`${guild.id}.config.muterole`, false)





    const newGuildEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setDescription(`J'ai rejoint le serveur **${guild.name}** !\nLe serveur compte **${guild.memberCount}** membres\nIl a été cré le **${moment(guild.createdAt).locale('fr').format('llll')}**\nJe suis maintenant dans **` + client.guilds.cache.size + `** serveurs !`)
        client.users.cache.get("770651879838449665").send(newGuildEmbed);
}