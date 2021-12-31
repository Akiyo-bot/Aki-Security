const { MessageEmbed } = require("discord.js");
const db = require('quick.db');
const message = require("./message");


module.exports = async (client, guild, user, args) => {
   
    let db_logena = db.get(`${guild.id}.config.log.enabled`);
    let db_logchannels = db.get(`${guild.id}.config.log.channels`);
    
    let antisban = db.get(`${guild.id}.config.protection.antisban`);

    let thingToEcho = db.get(`${guild.id}.${user.id}.ban`);

    if(!guild.me.hasPermission("VIEW_AUDIT_LOG")) return
    const fetchGuildAuditLogs = await guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_ADD'
    })

    const { executor } = fetchGuildAuditLogs.entries.first();

    if(antisban = true) {
        if((guild.ownerID === executor.id) || executor.bot || user.bot) return;

        //await client.updateGuild(guild, { lastBanExecutor: executor.id });        

        if(executor.id === executor.id) {
            if((Date.now() - executor.id) < 10000) {
                await guild.member(executor).ban({ reason: "A banni 2 personnes en moins de 10s" }).catch(() => {});
            }

           // await client.updateGuild(guild, { lastBanTimestamp: Date.now() });
        }
    }

    if(db_logena) {
        if(guild.channels.cache.get(db_logchannels)) {
            const embed = new MessageEmbed()
                .setColor('DARK_RED')
                .setTitle(`L'utilisateur **${user.username}** s'est fait bannir par **${executor}**`)
                .setDescription('Rasion du ban : **' + thingToEcho + '**')
                .setFooter('ID: ' + user.id)
                .setTimestamp();
            guild.channels.cache.get(db_logchannels).send(embed);
        }
    }
}