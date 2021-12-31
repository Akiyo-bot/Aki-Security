const { MessageEmbed } = require("discord.js");
const db = require('quick.db');
const message = require("./message");

module.exports = async (client, guild, user) => {

   
    let db_logena = db.get(`${guild.id}.config.log.enabled`);
    let db_logchannels = db.get(`${guild.id}.config.log.channels`);
    
    let antisban = db.get(`${guild.id}.config.protection.antisban`);

    let thingToEcho = db.get(`${guild.id}.${user.id}.ban`);

    if(db_logena) {
        if(db_logchannels) {
            if(!guild.me.hasPermission("VIEW_AUDIT_LOG")) return;
            const fetchGuildAuditLogs = await guild.fetchAuditLogs({
                limit: 1,
                type: 'MEMBER_BAN_REMOVE'
            })

            const embed = new MessageEmbed()
                .setColor('GREEN')
                .setTitle(`L'utilisateur **${user.username}** s'est fait débannir par **${fetchGuildAuditLogs.entries.first().executor}**`)
                .setDescription('Rasion du ban : **' + thingToEcho + '**')
                .setTimestamp();
            guild.channels.cache.get(db_logchannels).send(embed);
        }
    }
}