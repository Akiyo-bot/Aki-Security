const Discord = require("discord.js");
const db = require('quick.db');
const moment = require("moment");

module.exports = async (client, member) => {

    

    let prefix = db.get(`${member.guild.id}.config.prefix`);
    let db_goodbyes = db.get(`${member.guild.id}.config.goodbye.enabled`);
    
    let db_goodbyeschannels = db.get(`${member.guild.id}.config.goodbye.channels`);
    let db_goodbyesmessages = db.get(`${member.guild.id}.config.goodbye.message`);
    let db_goodbyesimage = db.get(`${member.guild.id}.config.goodbye.image`);
    if(!db_goodbyes) return;

    let goodbyeMsg = db_goodbyesmessages
        ?.replace('{user}', member)
        .replace('{guildName}', member.guild.name)
        .replace('{memberCount}', member.guild.memberCount)
        .replace('{username}', member.user.username)
        .replace('{usertag}', member.user.tag)


    if(!db_goodbyeschannels) {
        await member.send(goodbyeMsg).catch(() => {});
    } else {
        member.guild.channels.cache.get(db_goodbyeschannels).send(goodbyeMsg);
    }
}